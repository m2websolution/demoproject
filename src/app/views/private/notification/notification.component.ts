import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @ViewChild('newEmailInput') newEmailInput!: ElementRef<HTMLInputElement>;
  notificationList: any;
  key: string;
  profileId: string;
  Email: string[];
  emailControl: FormControl;
  inputEmail: boolean;
  updateNotification: any;

  constructor(private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private dialog: MatDialog) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.Email = [];
    this.updateNotification.Key = this.key;
    this.updateNotification.ProfileId = this.profileId;
    this.inputEmail = false;
    this.emailControl = new FormControl('', [
      Validators.email
    ]);
  }

  ngOnInit() {
    this.getNotificationList();
  }

  /**
   * Function: Adds email on enter/tab in email notification list.
   */
  onEnterEmail(): void {
    if (this.newEmailInput) {
      if (this.emailControl.valid && this.emailControl.value !== '') {
        this.updateNotification.Email.push(this.newEmailInput.nativeElement.value);
        this.inputEmail = false;
        this.newEmailInput.nativeElement.value = '';
        this.emailControl.reset();
        this.emailControl.setValue('');
      }
    }
  }

  /**
   * Function: Shows input field for entering email in email notification list. 
   */
  addCustomChip(): void {
    this.inputEmail = true;
  }

  /**
  * Function: To get email notification details.
  */
  getNotificationList(): void {
   
  }

 /**
   * Function: Updates the notification list details.
   */
  updateNotificationList(): void {
    this.commonService.SpinnerObervable(true);
    const updateNotification = {
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      ProfileId: this.commonService.GetLocalStorage('profileId'),
      IsDailyNotification: this.notificationList.IsDailyNotification,
      IsMonthlyNotification: this.notificationList.IsMonthlyNotification,
      IsWeeklyNotification: this.notificationList.IsWeeklyNotification,
      Email: this.notificationList.Email
    }
  }

  /**
   * Function: removes the email from the notification list.
   * @param indexToDelete : selected email index
   */
  removeEmail(indexToDelete: number): void {
    this.updateNotification.Email.splice(indexToDelete, 1);
  }


  onResize(event: any) {}
}
