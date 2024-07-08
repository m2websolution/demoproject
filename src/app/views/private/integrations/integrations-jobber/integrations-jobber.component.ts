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
  selector: 'app-integrations-jobber',
  templateUrl: './integrations-jobber.component.html',
  styleUrls: ['./integrations-jobber.component.css']
})

export class IntegrationsJobberComponent {
  jobberContentVisible = true;
  @Input() itemName: string;
  code: string = '';
  key: string;
  app: string = '';
  profileId: any;
  option2Content: any;
  jobberIntegrationForm: FormGroup;
  selectedOption: string = '';
  jobberIntegrationId : any;
  integrationNames: string = '';
  AccountName: string = '';

  constructor(private fb: FormBuilder, private dialog: MatDialog, private privateServices: PrivateServices, private router: Router, private route: ActivatedRoute, private commonService: CommonService, private http: HttpClient, private errorHandler: ErrorHandlerService) {
    this.jobberIntegrationForm = this.fb.group({
      Key: '',
      selectedRadio: ''
    });
  }
  jobberIntegrationDataModel = {
    HasInvoice: false,
    HasJobClosed: true
  };

  ngOnInit() {
    this.jobberIntegrationId = localStorage.getItem('jobberIntegrationId') || '';
    if (this.jobberIntegrationId) {
      this.getIntegrationDetails();
    }
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.app = params['app'];
      if (this.code) {
        this.addJobber();
        this.jobberContentVisible = false;
      }
    });
  }

  @Output() detailUpdate = new EventEmitter<string>();

  toggleScreen() {
    this.detailUpdate.emit();
    this.router.navigateByUrl(`integrations`);
  }

  loginJobber() {
    let url = window.location.origin;
  }

  /**
  * Function: To add jobber Integration.
  */
  addJobber() {
    let jobberData = {
      key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      code: this.code,
      profileId: this.commonService.GetLocalStorage('profileId')
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
    * Function: To delete jobber integration.
    */
  deleteIntegration(jobberIntegrationId: any): void {
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

        if (this.jobberIntegrationId != "" && this.jobberIntegrationId == jobberIntegrationId) {
          
        }
      }
    });
  }
  
  /**
    * Function: To change radiobutton values.
    */
  radioSelectionChange(event: any) {
    this.selectedOption = event.value;
  }

  /**
    * Function: To Update jobber integration.
    */
  updateJobberDetails() {
    const updatejobberData = {
      HasInvoice: this.jobberIntegrationForm.value.selectedRadio === "Invoice Created" ? true : false,
      HasJobClosed: this.jobberIntegrationForm.value.selectedRadio === "Job Closed" ? true : false,
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      ProfileId: this.commonService.GetLocalStorage('profileId')
    };

    if (this.jobberIntegrationForm.valid) {
    
    }
  }

  /**
    * Function: To Get JobberIntegrationDetails.
    */
  getIntegrationDetails() {
  
  }

}