import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import intlTelInput from 'intl-tel-input';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-invite-customer',
  templateUrl: './invite-customer.component.html',
  styleUrls: ['./invite-customer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InviteCustomerComponent {
  @ViewChild('phoneInput') phoneInput: ElementRef;

  breakPoint: number;
  heightManage: any;
  EmailSelect: boolean;
  SMSSelect: boolean;
  isOptinSelect: boolean;
  screenSize?: any;
  inviteForm: FormGroup;
  isButtonDisabled: boolean;
  isValidPhoneNumber: boolean;
  isWhatsAppSelect: boolean;
  countryData: intlTelInput.Plugin;
  loginKey: string;
  selectedCountryName: string;
  emailSmsLimit: any;
  helpDocumentation: Boolean = true;
  userType: string;
  isSMSVisible: boolean = false;
  profilesData: string;
  profileDetails: any = {};
  getIsSMS: boolean;

  constructor(private layoutService: LayoutService, private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.inviteForm = this.fb.group({
      key: '',
      profileId: '',
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      countryCode: '',
      isSMS: true,
      isEmail: true,
      isWhatsApp: true,
      IsOptin: false,
      forceResend: true,
    });

    this.isButtonDisabled = false;
    this.isWhatsAppSelect = false;
    this.SMSSelect = true;
    this.EmailSelect = true;
    this.isOptinSelect = false;
    this.breakPoint = 6;
    this.userType = this.commonService.GetLocalStorage('userType');
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    this.profileDetails = JSON.parse(this.profilesData);
  }

  ngOnInit() {
    this.screenSize = this.layoutService.screenSize;
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
      second: this.breakPoint == 1 ? '480px' : '310px',
      third: this.breakPoint == 1 ? '100px' : '120px',
    };

    // Showing SMS checkbox based on condition
    this.getIsSMS = this.commonService.GetLocalStorage('isSMS') === 'true'; 
    if (this.profileDetails.AllowSMS === true || this.userType === 'Agency User' && this.getIsSMS === true) {
      this.isSMSVisible = true;
    }

    // Permission code
    if (this.userType === 'Sub User') { 
      this.helpDocumentation = false;
    }
  }

  ngAfterViewInit() {
    if (this.phoneInput.nativeElement) {
      this.countryData = intlTelInput(this.phoneInput.nativeElement, {
        initialCountry: "auto",
        utilsScript: "node_modules/intl-tel-input/build/js/utils.js"
      });

      let country = this.commonService.GetLocalStorage('Country');
      if (country) {
        this.countryData.setCountry(country);
        const countryDropdown = this.phoneInput.nativeElement.parentElement.querySelector('.iti__flag-container');
        if (countryDropdown) {
          countryDropdown.style.pointerEvents = 'none';
          countryDropdown.style.opacity = '0.5';
        }
      }
    }
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
      first: this.breakPoint == 1 ? '70px' : '120px',
      second: this.breakPoint == 1 ? '480px' : '310px',
      third: this.breakPoint == 1 ? '100px' : '120px',
    };
  }

  emailUsedData: any = {
    id: 'EmailChart',
    data: 'Email',
    label: 'Email Used',
    total: 4000,
    used: 1000,
    remaining: 3000,
    activeColor: '#FAA81A',
  };

  smsUsedData: any = {
    id: 'SmsChart',
    data: 'SMS',
    label: 'SMS Used',
    total: 1000,
    used: 100,
    remaining: 900,
    activeColor: '#196CFA',
  };

  /**
  * Function: Check if the phone number is valid
  */
  onPhoneNumberChange(): void {
    this.isValidPhoneNumber = this.countryData.isValidNumber();
  }

  /**
   * Function: Clears the validation from email and phone number and phone number and adds custom validation.
   */
  clearEmailPhoneNumber(): void {
    if (this.EmailSelect && !this.SMSSelect) {
      this.inviteForm.get('phoneNumber').setValue('');
      this.inviteForm.get('phoneNumber').clearValidators();
      this.inviteForm.get('email').setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]);
      this.inviteForm.get('phoneNumber').updateValueAndValidity(); // Update validity for phoneNumber
      this.inviteForm.get('email').updateValueAndValidity();
    } else if (!this.EmailSelect && this.SMSSelect) {
      this.inviteForm.get('phoneNumber').setValidators([Validators.required]);
      this.inviteForm.get('email').setValue('');
      this.inviteForm.get('email').clearValidators();
      this.inviteForm.get('email').updateValueAndValidity();
      this.inviteForm.get('phoneNumber').updateValueAndValidity(); // Update validity for phoneNumber
    }
    else if (this.EmailSelect && this.SMSSelect) {
      this.inviteForm.get('phoneNumber').setValidators([Validators.required]);
      this.inviteForm.get('email').setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]);
      this.inviteForm.get('phoneNumber').updateValueAndValidity(); // Update validity for phoneNumber
      this.inviteForm.get('email').updateValueAndValidity();
    }
  }

  /**
  * Function: Submits the data to invite customer.
  */
  submit(): void {
    this.inviteForm.get('key').setValue(this.commonService.GetLocalStorage(
      AppConstant.localStorage_Token
    ));
    this.inviteForm.get('profileId').setValue(this.commonService.GetLocalStorage(
      'profileId'
    ));
    this.inviteForm.get('isSMS').setValue(this.SMSSelect);
    this.inviteForm.get('countryCode').setValue(this.countryData.getSelectedCountryData().dialCode);
    this.inviteForm.get('isEmail').setValue(this.EmailSelect);
    this.inviteForm.get('isWhatsApp').setValue(this.isWhatsAppSelect);
    this.inviteForm.get('IsOptin').setValue(this.isOptinSelect);
    this.inviteForm.get('forceResend').setValue(true);
    this.inviteForm.patchValue({
      phoneNumber: this.inviteForm.get('phoneNumber').value.toString()
    });

    if ((this.inviteForm.valid)) {
    
    }
    else {
      this.inviteForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
    }
  }
}
