import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';

interface PeriodicElement {
  type: string;
  name: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    type: 'CNAME',
    name: 'test',
    value: 'cname.vercel-dns.com',
  },
];

@Component({
  selector: 'app-domain-setup',
  templateUrl: './domain-setup.component.html',
  styleUrls: ['./domain-setup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DomainSetupComponent {
  isDetail: boolean = false;
  domainSetupForm: FormGroup;
  domainDetail: any;
  dataSource: any[];
  isDomainAvailable: boolean;
  isVerify: boolean;


  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private dialog: MatDialog, private clipboard: Clipboard) {
    this.domainSetupForm = this.fb.group({
      DomainName: ['', [Validators.required, this.subdomainValidator()]],
      DomainType: '',
      Key: ''
    });
    this.domainSetupForm.get('Key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.domainSetupForm.get('DomainType').setValue('subdomain');
    this.isDomainAvailable = false;
    this.isVerify = false;
  }

  ngOnInit() {
    this.getDomain();
  }
 /**
  * Function: Custom validator function to validate subdomains like "reviews.<subdomainname>.com.
  * @returns ValidatorFn: validator function
  */
  subdomainValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Regular expression pattern for a subdomain
      const pattern = /^reviews\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

      // Validate the control's value against the pattern
      const isValid = pattern.test(control.value);

      // If the value doesn't match the pattern, return validation error
      return isValid ? null : { 'invalidSubdomain': { value: control.value } };
    };
  }

  /**
  * Function: To get domain detail.
  */
  getDomain(): void {
   
  }

/**
  * Function: Creates the domain.
  */
  createDomain(): void {
   
  }

  /**
   * Function: Deletes the domain.
   */
  deleteDomain(): void {
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
    * Function: To copy the selected item from tab
    * @param item: tab items
    */
  copyItem(item: string): void {
    this.clipboard.copy(item);
    this.commonService.SnackObervable('Text copied')
  }

  /**
   * Function: Verfies the domain.
   */
  verifyDomain(): void {
    
  }

  toggleScreen() {
    this.isDetail = !this.isDetail;
  }

  displayedColumns: any = ['type', 'name', 'value'];
}
