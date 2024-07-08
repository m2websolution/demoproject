import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-additional-email-credits',
  templateUrl: './additional-email-credits.component.html',
  styleUrls: ['./additional-email-credits.component.css'],
})
export class AdditionalEmailCreditsComponent {
  radioOptions: any;
  counter = 0;
  addNewCard: boolean = false;
  key: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdditionalEmailCreditsComponent>,
    private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private commonService: CommonService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.counter = data.message.type === "Company" ? data.message.usedCount : 0;
    this.radioOptions = data.message.recurring ? "2" :"1"
  }

  onRadioButtonChange() {
    this.addNewCard = !this.addNewCard;
  }

  onSubmitRadioGroup() {
    console.log('onSubmitRadioGroup()');
    console.log('radios=' + this.radioOptions);
  }
  increment() {
    if (this.data.message.type === "Email") {
      this.counter += 1000;
    } else if (this.data.message.type === "SMS") {
      this.counter += 100;
    } else {
      this.counter++;
    }
  }

  decrement() {
    if (this.data.message.type === "Email") {
      if (this.counter >= 1000) {
        this.counter -= 1000;
      } else {
        this.counter = 0;
      }
    } else if (this.data.message.type === "SMS") {
      if (this.counter >= 100) {
        this.counter -= 100;
      } else {
        this.counter = 0;
      }
    } else if (this.data.message.type === "Company") {
      if (this.counter > this.data.message.usedCount) {
        this.counter--
      } else {
        this.counter = this.data.message.usedCount;
      }
    } else {
      if (this.counter > 0) {
        this.counter--;
      } else {
        this.counter = 0;
      }
    }
  }

  /**
* Handles the add-on purchase click event.
*/
  onPurchaseClick() {
    if (this.data.message.type === "Email" || this.data.message.type === "SMS") {
      const modal: any = {
        Key: this.key,
        Quantity: this.counter,
        Type: this.data.message.type,
        IsRecurring: this.radioOptions === '2' ? true : false
      };

      this.commonService.SpinnerObervable(true);
      
    } else if (this.data.message.type === "Company") {
      const modal: any = {
        Key: this.key,
        Quantity: this.counter
      };

      this.commonService.SpinnerObervable(true);
      
    }
  }
}
