import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { PagerService } from 'src/app/shared/services/pager.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-twilio-integration',
  templateUrl: './twilio-integration.component.html',
  styleUrls: ['./twilio-integration.component.css']
})
export class TwilioIntegrationComponent {
  displayedColumns: string[] = [
    'company_name',
    'shortname',
    'email',
    'account_sid',
    'action',
  ];

  key: string = '';
  pager: any = {};
  twilioList: any[];
  dataSource: any[];
  totalRecord: number;
  pagesize: number;
  pagedItems: any;
  page: number;
  twilioSID :string= '';
  subaccountSID: string = '';
  twilioAuthToken: string = '';
  AccountSId: string = '';
  AuthToken: string = '';
  dialogRef: MatDialogRef<any>;
  defaultSID: string = '';
	defaultToken: string = '';
  isPrimary : boolean;
  ProfileId: string;
  hide: boolean = true;
  defaultHide: boolean = true;

  @ViewChild('setLimitDialog') setLimitDialog: TemplateRef<any>;

  constructor(private fb: FormBuilder, private privateServices: PrivateServices, private dialog: MatDialog, private commonService: CommonService, private errorHandler: ErrorHandlerService, private pagerService: PagerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.totalRecord = 0;
    this.pagesize = 20;
    this.page = 1;
    this.getTwilioList();
  }

  twilioSetSIDModel = {
    HasUseDefaultTwilioCredential: true,
    isSubAccount: true,
    AccountSID: '',
    AuthToken: '',
    ShowAuthToken: false
  };

  /**
   * Function: Gets the details of the Twilio Integration.
   */
  getTwilioList(): void {
    
  }


  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  toggleDefaultPasswordVisibility() {
    this.defaultHide = !this.defaultHide;
  }

  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(
      this.dataSource.length,
      page,
      true,
      this.pagesize
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  setItemsSorting(data: number) {
    this.pager = this.pagerService.getPager(
      this.dataSource.length,
      1,
      true,
      data
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  /**
   * Function: SetTwilioDetails Integration for the model related.
   */
  SetTwilioDetails(): void {
    if (!this.twilioSetSIDModel.HasUseDefaultTwilioCredential) {
      this.twilioSetSIDModel.isSubAccount = true;
    } else {
      this.twilioSetSIDModel.isSubAccount = false;
    }
    let data = {
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      ProfileId: this.commonService.GetLocalStorage('profileId'),
      AccountSId: this.twilioSetSIDModel.AccountSID,
      AuthToken: this.twilioSetSIDModel.AuthToken,
      HasUseDefaultTwilioCredential: this.twilioSetSIDModel.HasUseDefaultTwilioCredential,
      isSubAccount: this.twilioSetSIDModel.isSubAccount
    };

    this.commonService.SpinnerObervable(true);
    
  }

  /**
   * Function: Model dialogRef code.
   */
  onSetTwilioAccount(defaultAccountSID: string): void {
    this.dialogRef = this.dialog.open(this.setLimitDialog, {
      width: '840px',
      panelClass: 'custom-container',
      data: {
        defaultAccountSID: defaultAccountSID
      },
      backdropClass: 'confirmDialogComponent',
      hasBackdrop: true
    });

    this.dialogRef.afterClosed().subscribe(result => {

    });
  }

  /**
   * Function: Update Default Twilio Integration.
   */
  updateDefaultTwilioIntegration(data: any) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      this.AccountSId = data.defaultAccountSID
    this.AuthToken = data.defaultAuthToken

    this.commonService.SpinnerObervable(true);
    
  }

}


