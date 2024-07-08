import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { Subscription } from 'rxjs';

export interface EmailNotification {
  image: string;
  email: string;
}

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailSettingsComponent {
  @ViewChild('newEmailInput') newEmailInput!: ElementRef<HTMLInputElement>;
  breakPoint: number = 6;
  heightManage: any;
  selectedRadio: number;
  selectedStatus: any;
  emailSettingsForm: FormGroup;
  key: string;
  profileId: string;
  emailSetting: any;
  id: number;
  notificationEmails: any[];
  inputEmail: boolean;
  email: string;
  emailControl: FormControl;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: EmailNotification[] = [];
  subscription: Subscription;

  constructor(private fb: FormBuilder, private privateServices: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService) {
    this.emailSettingsForm = this.fb.group({
      fromName: ['', [Validators.required]],
      replyToEmail: ['', [Validators.required, Validators.email]],
      fromEmail: ['', [Validators.required]],
      id: '',
      key: ''
    });
    this.emailControl = new FormControl('', [
      Validators.email
    ]);

    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.inputEmail = false;
    this.subscription = new Subscription();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.emails.push({ email: value, image: 'assets/images/Avatar.svg' });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: EmailNotification): void {
    const index = this.emails.indexOf(fruit);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  edit(fruit: EmailNotification, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.emails.indexOf(fruit);
    if (index >= 0) {
      this.emails[index].email = value;
    }
  }

  ngOnInit() {
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getEmailSettings();
      }
    });

    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '120px' : '100px',
    };
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '120px' : '100px',
    };
  }

  /**
   * Function: Adds email on enter in email notification list.
   * @param event: Event for enter button click. 
   */
  onEnterEmail(event: Event): void {
    event.preventDefault();
    if (this.newEmailInput) {
      const newEmailValue = this.newEmailInput.nativeElement.value;
      if (this.emailControl.valid && this.emailControl.value !== '') {
      
      }
    }
  }

  /**
   * Function: Shows input field for entering email in email notification list. 
   */
  addCustomChip(): void {
    this.inputEmail = true;
  }

  /**
   * Function: Gets Email settings data. 
   */
  getEmailSettings(): void {
   
  }

  /**
   * Function: Removes email from notification email list. 
   */
  removeEmail(notificationEmailId: number): void {
  
  }

  /**
   * Function: Handles the selection of the sender email.
   */
  setSelectedStatus(value: number): void {
    if (value === 1) {
      this.emailSettingsForm.get('fromEmail').clearValidators();
      this.emailSettingsForm.get('fromEmail').setValue('noreply@reviewuz.com');
      this.emailSettingsForm.get('fromEmail').setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]);
      this.emailSettingsForm.get('fromEmail').updateValueAndValidity();
    }
    else {
      this.emailSettingsForm.get('fromEmail').clearValidators();
      this.emailSettingsForm.get('fromEmail').setValue('');
      this.emailSettingsForm.get('fromEmail').setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9.]+$')]);
      this.emailSettingsForm.get('fromEmail').updateValueAndValidity();

    }
  }

  /**
   * Function: Updates the email settings .
   */
  submit(): void {
    this.commonService.SpinnerObervable(true);
    const senderEmail = this.emailSettingsForm.get('fromEmail').value;
    if (!(senderEmail === 'noreply@reviewuz.com')) {
      this.emailSettingsForm.get('fromEmail').setValue(senderEmail + '' + this.emailSetting.EmailDomain);
    }
    this.emailSettingsForm.get('fromEmail').clearValidators();
    this.emailSettingsForm.get('fromEmail').setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]);
    this.emailSettingsForm.get('fromEmail').updateValueAndValidity();
    if (this.emailSettingsForm.valid) {
     
    }
    else {
      this.emailSettingsForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
