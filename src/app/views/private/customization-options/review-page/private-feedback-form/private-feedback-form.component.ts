import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-private-feedback-form',
  templateUrl: './private-feedback-form.component.html',
  styleUrls: ['./private-feedback-form.component.css']
})
export class PrivateFeedbackFormComponent {
  @Input() privateFeedbackFormSettings: any;
  privateFeedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.privateFeedbackForm = this.fb.group({
      key: '',
      profileId: '',
      MessagePlaceholderText: ['', [Validators.required]],
      NamePlaceholder: ['', [Validators.required]],
      EmailPlaceholder: ['', [Validators.required]],
      PhoneNumberPlaceholder: ['', [Validators.required]],
      SubmitButtonText: ['', [Validators.required]],
      CloseButtonText: ['', [Validators.required]],
      NameRequired: [false, [Validators.required]],
      NameShowField: [false, [Validators.required]],
      EmailRequired: [false, [Validators.required]],
      EmailShowField: [false, [Validators.required]],
      PhoneNumberRequired: [false, [Validators.required]],
      PhoneNumberShowField: [false, [Validators.required]],
    });
    this.privateFeedbackForm.get('key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.privateFeedbackForm.get('profileId').setValue(this.commonService.GetLocalStorage('profileId'));
  }

  ngOnInit() {
    if (this.privateFeedbackForm) {
      this.privateFeedbackForm.get('MessagePlaceholderText').setValue(this.privateFeedbackFormSettings.MessagePlaceholderText);
      this.privateFeedbackForm.get('NamePlaceholder').setValue(this.privateFeedbackFormSettings.NamePlaceholder);
      this.privateFeedbackForm.get('EmailPlaceholder').setValue(this.privateFeedbackFormSettings.EmailPlaceholder);
      this.privateFeedbackForm.get('PhoneNumberPlaceholder').setValue(this.privateFeedbackFormSettings.PhoneNumberPlaceholder);
      this.privateFeedbackForm.get('SubmitButtonText').setValue(this.privateFeedbackFormSettings.SubmitButtonText);
      this.privateFeedbackForm.get('CloseButtonText').setValue(this.privateFeedbackFormSettings.CloseButtonText);
      this.privateFeedbackForm.get('NameRequired').setValue(this.privateFeedbackFormSettings.NameRequired);
      this.privateFeedbackForm.get('NameShowField').setValue(this.privateFeedbackFormSettings.NameShowField);
      this.privateFeedbackForm.get('EmailRequired').setValue(this.privateFeedbackFormSettings.EmailRequired);
      this.privateFeedbackForm.get('EmailShowField').setValue(this.privateFeedbackFormSettings.EmailShowField);
      this.privateFeedbackForm.get('PhoneNumberRequired').setValue(this.privateFeedbackFormSettings.PhoneNumberRequired);
      this.privateFeedbackForm.get('PhoneNumberShowField').setValue(this.privateFeedbackFormSettings.PhoneNumberShowField);
    }
  }

 /**
   * Function: Clears the validation for phone number placeholder based on show field selection.
   */
  phoneNumberValidation(): void {
    if (!this.privateFeedbackForm.get('PhoneNumberShowField').value) {
      this.privateFeedbackForm.get('PhoneNumberPlaceholder').clearValidators();
      this.privateFeedbackForm.get('PhoneNumberPlaceholder').updateValueAndValidity();
    } else {
      this.privateFeedbackForm.get('PhoneNumberPlaceholder').setValidators([Validators.required]);
      this.privateFeedbackForm.get('PhoneNumberPlaceholder').updateValueAndValidity();
    }
  }

  /**
   * Function: Clears the validation for name placeholder based on show field selection.
   */
  nameValidation(): void {
    if (!this.privateFeedbackForm.get('NameShowField').value) {
      this.privateFeedbackForm.get('NamePlaceholder').clearValidators();
      this.privateFeedbackForm.get('NamePlaceholder').updateValueAndValidity();
    } else {
      this.privateFeedbackForm.get('NamePlaceholder').setValidators([Validators.required]);
      this.privateFeedbackForm.get('NamePlaceholder').updateValueAndValidity();
    }
  }

  /**
   * Function: Clears the validation for email placeholder based on show field selection.
   */
  emailValidation(): void {
    if (!this.privateFeedbackForm.get('EmailShowField').value) {
      this.privateFeedbackForm.get('EmailPlaceholder').clearValidators();
      this.privateFeedbackForm.get('EmailPlaceholder').updateValueAndValidity();
    } else {
      this.privateFeedbackForm.get('EmailPlaceholder').setValidators([Validators.required]);
      this.privateFeedbackForm.get('EmailPlaceholder').updateValueAndValidity();
    }
  }

  /**
   * Function: Update the update private feedback form options
   */
  submit(): void {
   
  }
}
