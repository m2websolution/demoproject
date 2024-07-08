import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-opt-in-page',
  templateUrl: './opt-in-page.component.html',
  styleUrls: ['./opt-in-page.component.css']
})
export class OptInPageComponent {

  otpinPageDetails: any;
  otpinAuthenticationForm: FormGroup;
  updateOtpin: any;
  domainName: string;
  shortName: string;
  showEmailField: boolean;
  showPhoneNumberField: boolean;

  constructor(private privateService: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private fb: FormBuilder, private clipboard: Clipboard) {
    this.otpinAuthenticationForm = this.fb.group({
      Key: '',
      ProfileId: '',
      UserName: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      MagicLink: ['', [Validators.required]],
    });

    this.otpinAuthenticationForm.get('Key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.otpinAuthenticationForm.get('ProfileId').setValue(this.commonService.GetLocalStorage('profileId'));
    this.domainName = this.extractMainDomain(window.location.href);
    this.commonService.$updateProfile.subscribe((value: any) => {
      if (value) {
        this.shortName = value.ShortName;
        this.domainName = this.domainName + '/optin/' + this.shortName;
      }
    });
    this.showEmailField = true;
    this.showPhoneNumberField = true;

  }

  ngOnInit() {
    this.commonService.$dropdownValueSubject.subscribe(value => {
      if (value) {
        this.otpinAuthenticationForm.get('ProfileId').setValue(this.commonService.GetLocalStorage('profileId'));
        this.getOtpin();
      }
    });
  }

  /**
    * Function: To copy the selected item
    * @param item: link to be copied
    */
  copyItem(item: string): void {
    this.clipboard.copy(item);
    this.commonService.SnackObervable('Link copied');
  }

  /**
    * Function: To get otpin page settings details
    */
  getOtpin(): void {
   
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
    * Function: To authenticate otpin page details
    */
  submit(): void {
   
  }
}
