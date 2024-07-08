import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../services/common.services';
import { AppConstant } from '../../constants';

@Component({
  selector: 'app-confirmation-model',
  templateUrl: './confirmation-model.component.html',
  styleUrls: ['./confirmation-model.component.css']
})
export class ConfirmationModelComponent {
  panelOpenState = false;
  key: string;
  id: number;
  profileId: string;
  showMore: boolean;
  isReplyShowButton: boolean;
  upgradeMessage: boolean = false;
  @ViewChild('replyElement') replyElement: ElementRef | undefined;
  timer: number = 20;
  interval: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private commonService: CommonService, private dialogRef: MatDialogRef<ConfirmationModelComponent>) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.id = this.dialogData.id;
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.showMore = false;
    this.isReplyShowButton = false;
  }

  /**
 * Call to manage the new upgrade account popup
 */
  ngOnInit() {
    if (this.dialogData.message === 'upgrade') {
      this.dialogData.message = 'Upgrade to a higher plan to access this feature.'
      this.upgradeMessage = true
    } else if (this.dialogData.message === 'limitEX') {
      this.dialogData.message = 'Your profile limit has reached add more profile to continue?'
      this.upgradeMessage = true
    }else if (this.dialogData.message === 'Do you continue on session.') {
      this.startTimer();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLongDescription();
    }, 0);
  }

  /**
   * Function: Used to trim 4 line description and add read more/less button
   */
  isLongDescription(): void {
    const maxHeight = 24 * 4; // Max height for 4 lines as one line height is 24
    if (this.replyElement) {
      const rplElement = this.replyElement.nativeElement;
      const replyHeight = rplElement.scrollHeight;

      if (replyHeight > maxHeight) {
        this.isReplyShowButton = true;
      }
      else {
        this.isReplyShowButton = false;
      }
    }
  }

  /**
   * Function: Toggles button to expand/collapse content
   */
  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  /**
   * Function: Closes the dialog with true.
   */
  confirm(): void {
    clearInterval(this.interval);
    this.dialogRef.close(true);
  }
  
  /**
    * Function: Closes the dialog with false.
    */
  cancel(): void {
    clearInterval(this.interval);
    this.dialogRef.close(false);
  }

  /**
 * Function: Starts a countdown timer from 20 seconds.
 * Decrements the timer value every second.
 * Automatically confirms the dialog when the timer reaches 0.
 */
  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.confirm(); // Automatically confirm when the timer reaches 0
      }
    }, 1000);
  }
}
