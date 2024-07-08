import { Component, ViewEncapsulation, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailTemplateModalComponent } from '../template-modals/email-template-modal/email-template-modal.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.services';
import { AppConstant } from '../../constants';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import intlTelInput from 'intl-tel-input';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { noHtmlTagsValidator } from 'src/app/views/private/no-html-tags.validator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as customBuild from 'src/ckeditor/build/ckeditor';

@Component({
  selector: 'app-get-review-template',
  templateUrl: './get-review-template.component.html',
  styleUrls: ['./get-review-template.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GetReviewTemplateComponent {
  // ckeditor code
  public editor: any = customBuild;
  public config = {
    allowedContent: true,
    toolbar: [
      'fontfamily',
      'fontsize',
      'alignment',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'custombutton',
      'strikethrough',
      'underline',
      'subscript',
      'superscript',
      '|',
    ],
    disallowedContent: 'img; video; script; style; iframe;' // Disallow specific tags
  };

  @ViewChild('textarea') textarea: ElementRef;
  breakPoint: number = 6;
  heightManage: any;
  @Output() apiEmailSuccess: EventEmitter<boolean> = new EventEmitter();
  @Output() apiSmsSuccess: EventEmitter<boolean> = new EventEmitter();
  @Input() templateData: any;
  @Input() isCreateTemplate: any;
  @Input() inputFields: any;
  @Input() templateType: any;
  @Input() areTags: any;
  // data is any as there different type of object passed from parent component for message, email and private feedback.
  @Input() data: any;
  @Input() index: number;
  @ViewChild('phoneInput') phoneInput: ElementRef;
  countryData: intlTelInput.Plugin;
  emailPreview: any;
  smsPreview: string;
  feedbackPreview: any;
  domainName: string;
  custom: boolean;
  selectedProfile: any;
  timezone: string;
  createTempleteRequest: any;
  templateTags: string[] = [
    'firstname',
    'name',
    'reviewurl',
    'reviewurlpositive',
    'reviewurlbutton',
    'reviewurlnegative',
    'companyname',
    'ownername',
  ];
  previewEmailData: any = '';
  subjectData: any = '';
  time: number;
  createSmsTemplate: any;
  updateSmsTemplate: any;
  updatePrivateFeedback: any;
  updateEmailTemplate: any;
  characterCount: number;
  testSms: any;
  testEmail: any;
  logo: string;
  selectedCountryName: string;
  isValidPhoneNumber: boolean;


  wordsToReplace: string[];
  replacementValues: string[];
  sendIntervalDays: string[];
  times: string[];
  templateForm: FormGroup;
  testForm: FormGroup;
  formSubmitted: boolean;
  @Input() templateDropDown: any[] = []; 
  country: string;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private sanitizer: DomSanitizer, private clipboard: Clipboard, private router: Router, private errorHandler: ErrorHandlerService) {
    this.country = this.commonService.GetLocalStorage("Country");
    this.templateForm = this.fb.group({
      name: ['', [Validators.required]],
      sendInterval: ['assoonaspossible', [Validators.required]],
      message: ['', [Validators.required, this.reviewUrlButtonValidator()]],
      template: [''],
      subjectLine: ['', [Validators.required]],
      sentTime: ['08:00 AM'],
      key: '',
      time: [1, [Validators.max(60), Validators.min(1)]],
      id: 0,
      isLogo: false,
      sentWeekend: false
    });

    this.testForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      sms: ['', [Validators.required]],
      feedback: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });

    this.domainName = this.extractMainDomain(window.location.href);
    this.replacementValues = ['John', 'John Doe'];
    this.characterCount = 0;
    this.formSubmitted = false;
    this.isValidPhoneNumber = false;
    this.wordsToReplace = ["{firstname}", "{name}", "{companyname}", "{reviewurl}", "{reviewurlpositive}", "{reviewurlnegative}", "{ownername}"];
    this.replacementValues = [];
    this.sendIntervalDays = ["assoonaspossible", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "Custom"];
    this.times = ["00:00 AM", "00:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];
  }

  /**
   * Function: To get the domain.
   * @param url : current url
   * @returns domain
   */
  extractMainDomain(url: string): string {
    const parsedUrl = new URL(url);
    let domain = parsedUrl.protocol + '//' + parsedUrl.hostname;
    if (parsedUrl.hostname === 'localhost') {
      domain += `:${parsedUrl.port}`;
    }
    return domain;
  }

  /**
   * Function: To navigate company settings page.
   */
  editTimeZone(): void {
    this.router.navigate(['/company-setting']);
  }

  /**
   * Function: Checks validation if reviewUrlButton exist in certain pattern.
   * @returns ValidatorFn : true or null.
   */
  reviewUrlButtonValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;

      // Define the regex pattern
      const pattern = /\{reviewurlbutton\s+text\s*=\s*"([^"]*)"\}/g;
      const pattern2 = /\breviewurlbutton\b/g;

      // Find all matches of the pattern in the value
      const matches = value.match(pattern);
      const matches2 = value.match(pattern2);

      const match1 = matches?.length;

      const match2 = matches2?.length;

      if (match1 !== match2) {
        return { invalidReviewUrlButton: true };
      } else {
        return null;
      }
    };
  }

  /**
   * Function: Checks validation if reviewUrlButton exist in certain pattern.
   * @param event: selected option
   */
  onIntervalChange(event: MatSelectChange): void {
    if (event.value === 'assoonaspossible') {
      this.templateForm.get('sentTime').setValue('08:00 AM');
      this.templateForm.get('time').clearValidators();
      this.templateForm.get('time').setValue(0);
      this.templateForm.get('time').updateValueAndValidity();
    } else if (event.value === 'Custom') {
      this.templateForm.get('time').clearValidators();
      this.templateForm.get('time').setValidators([Validators.required, Validators.max(60), Validators.min(1)]);
      this.templateForm.get('time').updateValueAndValidity();
    }
    else {
      this.templateForm.get('sentTime').setValue(this.data.SentTime);
      this.templateForm.get('time').clearValidators();
      this.templateForm.get('time').setValue(0);
      this.templateForm.get('time').updateValueAndValidity();
    }
  }

  /**
   * Function: Deletes the selected template for email and sms.
   */
  deleteTemplate(): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',

        data: {
          message: ' Are You Sure You Want to Delete?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.SpinnerObervable(true);
        if (this.templateType === 'Email') {
     
        } else {
        
        }
      }
    });
  }

  /**
    * Function: To copy the selected item from tab
    * @param item: tab items
    */
  copyItem(item: string) {
    if (item === 'reviewurlbutton') {
      this.clipboard.copy(`{${item} text = "Review Us"}`);
    } else {
      this.clipboard.copy(`{${item}}`);
    }
    this.commonService.SnackObervable('Text copied')
  }

  /**
    * Function: To replace the selected item from message based on replacement value.
    * @param sentence: message 
    * @returns string : after changing the message to updated value.
    */
  replaceWordsInSentence(sentence: string): string {
    const regex = /\{reviewurlbutton\s+text\s*=\s*"([^"]*)"\}/gi;
    let match;

    // Iterate through matches in the sentence
    while ((match = regex.exec(sentence)) !== null) {
      const buttonText = match[1];
      const button = match[0];
      if (buttonText.trim() !== '') {
        sentence = sentence.replace(button, `<div class="d-flex justify-content-center"><button type="button" mat-flat-button color="primary" class="preview-button" [routerLink]="this.replacementValues[3]">${buttonText}</button></div>`);
      } else {
        sentence = sentence.replace(match[0], '');
      }

    }
    for (let i = 0; i < this.wordsToReplace.length; i++) {
      const regex = new RegExp(this.wordsToReplace[i], 'gi');
      sentence = sentence.replace(regex, this.replacementValues[i]);
    }
    return sentence;
  }

  /**
    * Function: To validate the sms template.
    * @returns boolean: true or false
    */
  validateSMSTemplate(): boolean {
    return this.templateForm.get('name').valid && this.templateForm.get('message').valid;
  }

  /**
    * Function: To validate the private feedback template.
    * @returns boolean: true or false
    */
  validatePrivateFeedbackTemplate(): boolean {
    return this.templateForm.get('message').valid && this.templateForm.get('subjectLine').valid;
  }

  /**
    * Function: To submit the details of email, sms and private feedback.
    */
  onSubmit(): void {
    if (this.templateType === 'Email') {
      if (this.isCreateTemplate) {
        if (this.templateForm.valid) {
          this.commonService.SpinnerObervable(true);
          if (this.templateForm.get('sendInterval').value === 'Custom') {
            this.createTempleteRequest.SendInterval = this.templateForm.get('time').value.toString();
          } else {
            this.createTempleteRequest.SendInterval = this.templateForm.get('sendInterval').value;
          }
          this.createTempleteRequest.EmailName = this.templateForm.get('name').value;
          this.createTempleteRequest.EmailHTML = this.templateForm.get('message').value;
          this.createTempleteRequest.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
          this.createTempleteRequest.ProfileId = this.commonService.GetLocalStorage('profileId');
          this.createTempleteRequest.SubjectLine = this.templateForm.get('subjectLine').value;
          this.createTempleteRequest.SentTime = this.templateForm.get('sentTime').value;
          this.createTempleteRequest.SentWeekend = this.templateForm.get('sentWeekend').value;
          
        }
        else {
          this.templateForm.markAllAsTouched();
          this.commonService.SnackObervable('Invalid Form');
        }
      } else {
        if (this.templateForm.valid) {
          this.commonService.SpinnerObervable(true);
          if (this.templateForm.get('sendInterval').value === 'Custom') {
            this.custom = true;
            const time = this.templateForm.get('time').value.toString();
            this.templateForm.get('sendInterval').setValue(time);
          }

          this.updateEmailTemplate.EmailName = this.templateForm.get('name').value;
          this.updateEmailTemplate.EmailHTML = this.templateForm.get('message').value;
          this.updateEmailTemplate.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
          this.updateEmailTemplate.SendInterval = this.templateForm.get('sendInterval').value;
          this.updateEmailTemplate.SubjectLine = this.templateForm.get('subjectLine').value;
          this.updateEmailTemplate.SentTime = this.templateForm.get('sentTime').value;
          this.updateEmailTemplate.SentWeekend = this.templateForm.get('sentWeekend').value;
          this.updateEmailTemplate.Id = this.templateForm.get('id').value;
          this.updateEmailTemplate.HasUpdateSentTime = true;
      
        }
        else {
          this.templateForm.markAllAsTouched();
          this.commonService.SnackObervable('Invalid Form');
        }
      }
    } else if (this.templateType === 'SMS') {
      this.templateForm.get('message').enable();
      if (this.isCreateTemplate) {
        if (this.validateSMSTemplate()) {
          this.commonService.SpinnerObervable(true);
          this.createSmsTemplate.TemplateTitle = this.templateForm.get('name').value;
          this.createSmsTemplate.Message = this.templateForm.get('message').value;
          this.createSmsTemplate.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
          this.createSmsTemplate.ProfileId = this.commonService.GetLocalStorage('profileId');
          this.createSmsTemplate.SendInterval = this.templateForm.get('sendInterval').value;
          this.createSmsTemplate.SentTime = this.templateForm.get('sentTime').value;
      
        } else {
          this.templateForm.markAllAsTouched();
          this.commonService.SnackObervable('Invalid Form');
        }
      } else {
        if (this.validateSMSTemplate()) {
          this.commonService.SpinnerObervable(true);
          if (this.templateForm.get('sendInterval').value === 'Custom') {
            this.custom = true;
            const time = this.templateForm.get('time').value.toString();
            this.templateForm.get('sendInterval').setValue(time);
          }
          this.updateSmsTemplate.TemplateTitle = this.templateForm.get('name').value;
          this.updateSmsTemplate.Message = this.templateForm.get('message').value;
          this.updateSmsTemplate.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
          this.updateSmsTemplate.Id = this.templateForm.get('id').value;
          this.updateSmsTemplate.SendInterval = this.templateForm.get('sendInterval').value;
          this.updateSmsTemplate.SentTime = this.templateForm.get('sentTime').value;
          this.updateSmsTemplate.SentWeekend = false;
          this.updateSmsTemplate.HasUpdateSentTime = true;

       
        }
        else {
          this.templateForm.markAllAsTouched();
          this.commonService.SnackObervable('Invalid Form');
        }
      }
    } else {
      if (this.validatePrivateFeedbackTemplate()) {
        this.commonService.SpinnerObervable(true);
        this.updatePrivateFeedback.EmailHTML = this.templateForm.get('message').value;
        this.updatePrivateFeedback.Id = this.templateForm.get('id').value;
        this.updatePrivateFeedback.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
        this.updatePrivateFeedback.Subject = this.templateForm.get('subjectLine').value;
      }
      else {
        this.templateForm.markAllAsTouched();
        this.commonService.SnackObervable('Invalid Form');
      }
    }
  }

  /**
   * Function: Counts the charcter in message
   * @param text: message text
   */
  updateCharacterCount(text: string): void {
    this.characterCount = text.length;
  }

  /**
    * Function: Check if the phone number is valid
    */
  onPhoneNumberChange(): void {
    this.isValidPhoneNumber = this.countryData.isValidNumber();
  }

  /**
    * Function: To test sms and email template.
    */
  testEmailSms(): void {
    if (this.templateType === 'Email') {
      this.formSubmitted = true;
      if (this.testForm.get('email').valid && this.testForm.get('name').valid) {
        this.commonService.SpinnerObervable(true);
        this.testEmail.Email = this.testForm.get('email').value;
        this.testEmail.Name = this.testForm.get('name').value;
        this.testEmail.ProfileId = this.commonService.GetLocalStorage('profileId');
        this.testEmail.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
        this.testEmail.TemplateId = this.templateForm.get('id').value;
      }
      else {
        this.commonService.SnackObervable('Invalid form');
        this.testForm.get('email').markAsTouched;
        this.testForm.get('name').markAsTouched;
      }
    } else if (this.templateType === 'SMS') {
      this.formSubmitted = true;
      if (this.isValidPhoneNumber && this.testForm.get('name').valid) {
        this.commonService.SpinnerObervable(true);
        this.testSms.PhoneNumber = this.testForm.get('sms').value;
        this.testSms.Name = this.testForm.get('name').value;
        this.testSms.ProfileId = this.commonService.GetLocalStorage('profileId');
        this.testSms.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
        this.testSms.TemplateId = this.templateForm.get('id').value;
        this.testSms.CountryCode = this.countryData.getSelectedCountryData().dialCode;
      }
      else {
        this.commonService.SnackObervable('Invalid form');
        this.testForm.get('sms').markAsTouched;
        this.testForm.get('name').markAsTouched;
      }
    }

  }

  openTemplateModal() {
    const ref: MatDialogRef<EmailTemplateModalComponent> = this.dialog.open(
      EmailTemplateModalComponent,
      {
        width: '800px',
        maxWidth: '90vw',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          emailData: this.replaceWordsInSentence(this.templateForm.get('message').value),
          logo: this.logo
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  ngOnInit(): void {
    if (this.data) {
      if (this.templateType === 'SMS') {
        if (this.isCreateTemplate) {
          this.templateForm.get('sendInterval').setValue('assoonaspossible');
          this.templateForm.get('sentTime').setValue('08:00 AM');
        } else {
          this.templateForm.get('sendInterval').setValue(this.data.Id);
          this.templateForm.get('sentTime').setValue(this.data.SentTime);
        }
        this.templateForm.get('name').setValue(this.data.TemplateTitle);
        this.templateForm.get('message').setValue(this.data.Message);
        if (this.country === "India (भारत)") {
          this.templateForm.get('template').setValue(this.data.Message);
          this.templateForm.get('message').disable();
        }
        this.templateForm.get('subjectLine').setValue(this.data.SubjectLine);
      } else if (this.templateType === 'Email') {
        if (this.isCreateTemplate) {
          this.templateForm.get('sendInterval').setValue('assoonaspossible');
          this.templateForm.get('sentTime').setValue('08:00 AM');
        } else {
          this.templateForm.get('sendInterval').setValue(this.data.Id);
          this.templateForm.get('sentTime').setValue(this.data.SentTime);
        }
        this.templateForm.get('name').setValue(this.data.EmailName);
        this.templateForm.get('message').setValue(this.data.EmailHTML);
        this.templateForm.get('subjectLine').setValue(this.data.SubjectLine);
      } else {
        this.templateForm.get('message').setValue(this.data.EmailHTML);
        this.templateForm.get('subjectLine').setValue(this.data.Subject);
      }
      this.templateForm.get('id').setValue(this.data.Id);
      this.templateForm.get('key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
      if (parseInt(this.data.SendInterval) > 15) {
        this.templateForm.get('sendInterval').setValue('Custom');
        this.templateForm.get('time').setValue(parseInt(this.data.SendInterval));
        this.templateForm.get('time').clearValidators();
        this.templateForm.get('time').setValidators([Validators.required, Validators.max(60), Validators.min(1)]);
        this.templateForm.get('time').updateValueAndValidity();
      } else {
        this.templateForm.get('sendInterval').setValue(this.data.SendInterval);
      }
    }

    if (window.innerWidth > 1000 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
    };

    this.commonService.$updateProfile.subscribe((value: any) => {
      if (value) {
        this.selectedProfile = value;
        const shortName = this.selectedProfile.ShortName;
        this.replacementValues[6] = this.selectedProfile.Owner_Name;
        this.replacementValues[3] = `<a href="${this.domainName}/${shortName}">${this.domainName}/${shortName}</a>`;
        this.replacementValues[4] = `<a href="${this.domainName}/${shortName}#h">${this.domainName}/${shortName}#h</a>`;
        this.replacementValues[5] = `<a href="${this.domainName}/${shortName}#u">${this.domainName}/${shortName}#u</a>`;
        this.replacementValues[2] = this.selectedProfile.CompanyName;
        this.replacementValues[0] = 'John';
        this.replacementValues[1] = 'John Doe';
        this.timezone = this.selectedProfile.TimeZone;
        this.logo = this.selectedProfile.LogoURL;
        if (this.data) {
          if (this.templateType === 'SMS') {
            this.smsPreview = this.replaceWordsInSentence(this.data.Message);
            this.updateCharacterCount(this.data.Message);
          } else if (this.templateType === 'Email') {
            this.emailPreview.safeHtml = this.replaceWordsInSentence(this.data.EmailHTML);
            this.emailPreview.index = this.index;
          } else if (this.templateType === 'Feedback') {
            this.feedbackPreview.safeHtml = this.replaceWordsInSentence(this.data.Feedback);
            this.feedbackPreview.index = this.index;
          }
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.phoneInput) {
      this.countryData = intlTelInput(this.phoneInput.nativeElement, {
        initialCountry: "auto",
        utilsScript: "node_modules/intl-tel-input/build/js/utils.js"
      });
      this.commonService.$countryValueSubject.subscribe(value => {
        this.selectedCountryName = value;
        if (this.selectedCountryName) {
          this.countryData.setCountry(this.selectedCountryName);
        }
      });
    }
  }

  onResize(event: any) {
    if (window.innerWidth > 1000 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
    };
  }

  /**
* Function: Handle Template Change
* Description: Updates the message template form field when a new template is selected
* @param event The event object containing the selected template value
*/
  onTemplateChange(event: any): void {
    const selectedTemplate = this.templateDropDown.find((res: any) => res.template === event.value);

    if (selectedTemplate) {
      this.templateForm.get('message').setValue(selectedTemplate.template);
      this.templateForm.get('message').disable();
    }
  }
}
