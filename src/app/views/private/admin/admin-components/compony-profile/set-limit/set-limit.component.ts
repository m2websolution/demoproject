import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-set-limit',
  templateUrl: './set-limit.component.html',
  styleUrls: ['./set-limit.component.css'],
})
export class SetLimitComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  updateCompanyProfile: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private privateServices: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private dialogRef: MatDialogRef<SetLimitComponent>) {
    this.updateCompanyProfile.EmailLimit = 0;
    this.updateCompanyProfile.SMSLimit = 0;
    this.updateCompanyProfile.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.updateCompanyProfile.SMSLimit = 0;
    this.updateCompanyProfile.SMSLimit = 0;
    this.updateCompanyProfile.HasSMS = this.dialogData.isSMS;
    this.updateCompanyProfile.HasEmail = this.dialogData.isEmail;
    this.updateCompanyProfile.ProfileId = this.dialogData.profileId;
  }

  increment(key: number) {
    if (key) {
      this.updateCompanyProfile.SMSLimit++;
    } else {
      this.updateCompanyProfile.EmailLimit++;
    }
  }

  decrement(key: number) {
    if (key) {
      this.updateCompanyProfile.SMSLimit != 0 && this.updateCompanyProfile.SMSLimit--;
    } else {
      this.updateCompanyProfile.EmailLimit != 0 && this.updateCompanyProfile.EmailLimit--;
    }
  }

   /**
   * Function: Updates company profile.
   */
   updateCompany(): void {
   
  }
}
