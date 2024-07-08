import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

interface PeriodicElement {
  type: string;
  host: string;
  value: string;
  status: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    type: 'MX',
    host: 'em4135.snehal.com',
    value: 'mx.sendgrid.net.',
    status: false,
  },
  {
    type: 'TXT',
    host: 'em4135.snehal.com',
    value: 'v=spf1 include:sendgrid.net-all',
    status: false,
  },
  {
    type: 'TXT',
    host: 'm1_domainkey.snehal.com',
    value: `k=rsa; t=s;

    p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBIQKBgQC5Fdn /owNiViafh8utC7jvaFd63N+kWSB3d9COyaWsu+Y/oaa3luj9OM YVQjF838sPwXZEbb+ntinZs/jfTzLDK1jF2Khno9xEV7Y4spZoYxg W1aXbvvMFgT3+0A/p7NmFoFQjBMVLrIQzuj8SfUc3s4odTfynlQ
    
    QAB`,
    status: false,
  },
];

@Component({
  selector: 'app-email-domain-setup',
  templateUrl: './email-domain-setup.component.html',
  styleUrls: ['./email-domain-setup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailDomainSetupComponent {
  dataSource: any[];
  displayedColumns: any = ['type', 'host', 'value', 'status'];
  emailDomainSetupForm: FormGroup;
  emailDomainDetail: any;
  isDomainAvailable: boolean;
  isVerify: boolean;


  isDetail: boolean = false;

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private clipboard: Clipboard, private dialog: MatDialog) {
    this.emailDomainSetupForm = this.fb.group({
      DomainName: ['', [Validators.required, this.domainValidator()]],
      Key: ''
    });
    this.emailDomainSetupForm.get('Key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.isDomainAvailable = false;
    this.isVerify = false;
  }

  ngOnInit() {
    this.getEmailDomain();
  }

  /**
    * Function: To copy the selected item from tab
    * @param item: tab items
    */
  copyItem(item: string) {
    this.clipboard.copy(item);
    this.commonService.SnackObervable('Text copied')
  }

  /**
    * Function: Custom validator function to validate domain names like "<domainName>.com" with word breaks
    * @returns ValidatorFn: validator function
    */
  domainValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Regular expression pattern for the specified domain format
      const pattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

      // Validate the control's value against the pattern
      const isValid = pattern.test(control.value);

      // If the value doesn't match the pattern, return validation error
      return isValid ? null : { 'invalidDomain': { value: control.value } };
    };
  }

  /**
  * Function: To get branding details.
  */
  getEmailDomain(): void {
  
  }

  /**
   * Function: To delete an employee.
   */
  deleteEmailDomain(): void {
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
       
      }
    });
  }

  /**
    * Function: Creates email domain.
    */
  createEmailDomain(): void {
   
  }

  /**
    * Function: Verifies the email domain.
    */
  verifyEmailDomain(): void {
   
  }

}
