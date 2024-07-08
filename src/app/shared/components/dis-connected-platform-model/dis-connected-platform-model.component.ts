import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from '../../constants';
import { CommonService } from '../../services/common.services';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';

@Component({
  selector: 'app-dis-connected-platform-model',
  templateUrl: './dis-connected-platform-model.component.html',
  styleUrls: ['./dis-connected-platform-model.component.css'],
})
export class DisConnectedPlatformModelComponent {
  panelOpenState = false;
  key: string;
  id: number;
  siteName: string;
  profileId: string;
  reviewConnectedCount: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private privateService: PrivateServices, private commonService: CommonService, private dialogRef: MatDialogRef<DisConnectedPlatformModelComponent>, private errorHandler: ErrorHandlerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.id = this.dialogData.id;
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.siteName = this.dialogData.header;
  }

  /**
   * Function: To delete connected platform from connected platform list.
   */
  disconnectPlatform(): void {
   
  }
}
