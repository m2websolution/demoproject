import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { PrivateServices } from 'src/app/services/PrivateServices';

@Component({
  selector: 'app-integrations-detail',
  templateUrl: './integrations-detail.component.html',
  styleUrls: ['./integrations-detail.component.css'],
})

export class IntegrationsDetailComponent {
  lastAction: any;
  @Input() itemName: string;
  isnIntegrationForm: FormGroup;
  isButton = false;
  isnIntegrationId: any;
  isButtonActive = true;
  isnIntegrationName: string = '';

  constructor(public router: Router, private http: HttpClient, private privateServices: PrivateServices, private dialog: MatDialog, private errorHandler: ErrorHandlerService, private commonService: CommonService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.isnIntegrationForm = this.fb.group({
      CompanyKey: ['', Validators.required],
      Customer: [true],
      Seller: [false],
      Buyer: [false],
      webhookURL: '',
    });
  }

  ngOnInit(){
    this.isnIntegrationId = localStorage.getItem('isnIntegrationId') || '';
    if(this.isnIntegrationId)
      {
        this.getIntegrationDetails();
      }
  }

  @Output() detailUpdate = new EventEmitter<string>();

  toggleScreen() {
    this.detailUpdate.emit();
    this.router.navigateByUrl(`integrations`);
  }
  
  public isAtLeastOneCheckboxChecked(): boolean {
    const { Customer, Seller, Buyer } = this.isnIntegrationForm.value;
    return Customer || Seller || Buyer;
  }

  /**
   * Function: To Add ISN Integration.
   */
  addISNAPI() {
    if (this.isnIntegrationForm.get('CompanyKey').invalid) {
      this.isnIntegrationForm.get('CompanyKey').markAsTouched();
      return;
    }
    if (this.isnIntegrationForm.valid && this.isAtLeastOneCheckboxChecked()) {
      const formData = this.isnIntegrationForm.value;
      const isnData = {
        companyKey: formData.CompanyKey,
        profileId: this.commonService.GetLocalStorage('profileId'),
        key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
        hasSentCustomer: formData.Customer,
        hasSentSeller: formData.Seller,
        hasSentBuyer: formData.Buyer,
      };

     
    }
  }

  
  /**
   * Function: To Get All Connected Integration.
   */
  getConnectedIntegration() {
    const key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    const profileId = this.commonService.GetLocalStorage('profileId');

   
  }
  
  /**
   * Function: To Get ISN IntegrationDetails.
   */
  getIntegrationDetails() {
    const key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    const profileId = this.commonService.GetLocalStorage('profileId');
    this.isnIntegrationId = localStorage.getItem('isnIntegrationId');

  }

  /**
   * Function: To Update ISN IntegrationDetails.
   */
  updateISNDetails() {
    const formData = this.isnIntegrationForm.value;
    const updateISNData = {
      companyKey: formData.CompanyKey,
      profileId: this.commonService.GetLocalStorage('profileId'),
      key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      integrationId: this.isnIntegrationId = localStorage.getItem('isnIntegrationId'),
      hasSentCustomer: formData.Customer,
      hasSentSeller: formData.Seller,
      hasSentBuyer: formData.Buyer,
    };

    if (this.isnIntegrationForm.valid && this.isAtLeastOneCheckboxChecked()) {
   
    }
  }


/**
* Function: To delete ISN integration.
*/
  deleteIntegration(isnIntegrationId: any): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(ConfirmationModelComponent, {
      width: '50%',
      maxWidth: '480px',
      height: '50%',
      panelClass: 'custom-container',
      data: {
        message: 'Are You Sure You Want to Delete?',
      },
      backdropClass: 'confirmDialogComponent',
      hasBackdrop: true,
    }
    );

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.SpinnerObervable(true);
        const key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
        if (this.isnIntegrationId != "" && this.isnIntegrationId == isnIntegrationId) {
         
        }
      }
    });
  }

}
