import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quickbooks',
  templateUrl: './quickbooks.component.html',
  styleUrls: ['./quickbooks.component.css']
})

export class QuickbooksComponent {
  lastAction: any;
  quickbooksVisible = true;
  @Input() itemName: string;
  quickbooksIntegrationForm: FormGroup;
  selectedOption: string = '';
  code: string = '';
  realmId: string = '';
  HasCustomer: boolean;
  HasInvoice: boolean;
  RedirectURL: any;
  quickIntegrationId: any;
  integrationNames: string = '';
  integrationName: string = '';
  AccountName: string = '';

  constructor(public router: Router, private http: HttpClient, private privateServices: PrivateServices, private dialog: MatDialog, private route: ActivatedRoute, private commonService: CommonService, private fb: FormBuilder, private errorHandler: ErrorHandlerService) {
    this.quickbooksIntegrationForm = this.fb.group({
      Key: '',
      selectedRadio: ''
    });
  }

  ngOnInit() {
    this.quickIntegrationId = localStorage.getItem('quickIntegrationId') || '';
    if (this.quickIntegrationId) {
      this.getIntegrationDetails();
    }

    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.realmId = params['realmId'];
      if (this.code) {
        this.addQuickooks();
        this.quickbooksVisible = false;
      }
    });
  }

  quickbookIntegrationDataModel = {
    HasInvoice: true,
    HasCustomer: false,
    name: ''
  };

  @Output() detailUpdate = new EventEmitter<string>();

  toggleScreen() {
    this.detailUpdate.emit();
    this.router.navigateByUrl(`integrations`);
  }
  
  /**
    * Function: To login Quickbooks integration.
    */
  loginQuickBooks() {
    let url = window.location.origin + "/integrations/quickbooks";
    let encodedURL: any = encodeURIComponent(url);
    localStorage.setItem("quickbooks", "true");
  }

  /**
    * Function: To radiobutton values.
    */
  radioSelectionChange(event: any) {
    this.selectedOption = event.value;
  }
	
  /**
    * Function: To add quickbooks Integration.
    */
  addQuickooks() {
    let url = window.location.origin;
    let quickbookData = {
      profileId: this.commonService.GetLocalStorage('profileId'),
      key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      realmId: this.realmId,
      code: this.code,
      HasCustomer: this.quickbookIntegrationDataModel.HasCustomer,
      HasInvoice: this.quickbookIntegrationDataModel.HasInvoice,
      RedirectURL: url + "/integrations/quickbooks"
    };

  
  }

  /**
    * Function: To Get AllConnectedIntegration.
    */
  getConnectedIntegration() {
    const key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    const profileId = this.commonService.GetLocalStorage('profileId');

  }

  /**
    * Function: Toupdate quickbooks Integration.
    */
  updateQuickbooksDetails() {
    const updateQuickbooksData = {
      HasInvoice: this.quickbooksIntegrationForm.value.selectedRadio === "Invoice" ? true : false,
      HasCustomer: this.quickbooksIntegrationForm.value.selectedRadio === "Customer" ? true : false,
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      ProfileId: this.commonService.GetLocalStorage('profileId')
    };

    if (this.quickbooksIntegrationForm.valid) {
  
    }
  }

  /**
    * Function: To delete quickbooks Integration.
    */
  deleteIntegration(quickIntegrationId: any): void {
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
       
      }
    });
  }

  /**
    * Function: To Get quickbooks-IntegrationDetails.
    */
  getIntegrationDetails() {
   
  }
}
