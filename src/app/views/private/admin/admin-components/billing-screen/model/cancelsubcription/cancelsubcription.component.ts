import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-cancelsubcription',
  templateUrl: './cancelsubcription.component.html',
  styleUrls: ['./cancelsubcription.component.css']
})
export class CancelsubcriptionComponent {
  key: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private privateService: PrivateServices,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<CancelsubcriptionComponent>,
    private errorHandler: ErrorHandlerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
  }

  /**
 * Cancels a subscription.
 */
  onConfirmCancel() {
    
  }
}
