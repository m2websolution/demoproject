
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import intlTelInput from 'intl-tel-input';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-admin-my-account',
  templateUrl: './admin-my-account.component.html',
  styleUrls: ['./admin-my-account.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminMyAccountComponent implements OnInit {
  @ViewChild('phoneNumberInput') phoneNumberInput: ElementRef;
  countryData: intlTelInput.Plugin;
  adminAccountsForm: FormGroup;
  key: string;
  isButtonDisabled: boolean = false;

  constructor(private fb: FormBuilder, private commonService: CommonService, private errorHandler: ErrorHandlerService) {
    this.adminAccountsForm = this.fb.group({
      Key: '',
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: [''],
      PhoneNumber: ['', [Validators.required]]
    });
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.adminAccountsForm.get('Key').setValue(this.key);
  }

  ngOnInit(): void {
    this.getDetails();
    this.adminAccountsForm.controls['Email'].disable();
  }

  /**
   * Function: Get Country Code.
   */
  ngAfterViewInit() {
    if (this.phoneNumberInput.nativeElement) {
      this.countryData = intlTelInput(this.phoneNumberInput.nativeElement, {
        initialCountry: 'auto',
        geoIpLookup: (callback) => {
          fetch('https://ipapi.co/json')
            .then((res) => res.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback('us'));
        },
        utilsScript: 'node_modules/intl-tel-input/build/js/utils.js',
      });
    }
    this.phoneNumberInput.nativeElement.addEventListener(
      'countrychange',
      () => {
        this.adminAccountsForm
          .get('Country')
          .setValue(this.countryData.getSelectedCountryData().name);
        const code = this.countryData.getSelectedCountryData().iso2;
        this.adminAccountsForm
          .get('Country_code')
          .setValue(this.countryData.getSelectedCountryData().dialCode);
      }
    );

    const code = this.countryData.getSelectedCountryData().iso2;
    this.adminAccountsForm
      .get('Country_code')
      .setValue(this.countryData.getSelectedCountryData().dialCode);
  }

  /**
    * Function: Gets My Accounts list.
    */
  getDetails() {

  }

  /**
   * Function: Update My Account details.
   */
  submit(): void {
   
  }
}

