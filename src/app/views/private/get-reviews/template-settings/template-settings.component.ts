import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailTemplateModalComponent } from 'src/app/shared/components/template-modals/email-template-modal/email-template-modal.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-settings',
  templateUrl: './template-settings.component.html',
  styleUrls: ['./template-settings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TemplateSettingsComponent {
  breakPoint: number = 6;
  heightManage: any;

  openedTab: number = 0;
  openedTab1: number;
  openedTab2: number = 0;
  key: string;
  profileId: string;
  emailTemplates: any[];
  smsTemplateDetails: any;
  smsDetails: any[];
  privateFeedback: any[];
  isEmailTemplateLoaded: boolean;
  isSMSTemplateLoaded: boolean;
  subscription: Subscription;

  templateTags: string[] = [
    'firstname',
    'name',
    'companyname',
    'ownername',
    'reviewurl',
    'reviewurlpositive',
    'reviewurlnegative',
  ];

  selectedTabEmail?: number = 0;
  selectedTabSMS?: number = 0;
  selectedTabFeedback?: number = 0;
  // selectedTabEmail?: any = 0;
  emailTabs: string[] = [
    'First Review Request',
    'Reminder For Review',
    'One Last Reminder',
    'Create New Template',
  ];
  smsTabs: string[] = ['First Review Request', 'Create New Template'];

  public demo1TabIndex = 1;
  public demo1BtnClick() {
    const tabCount = 3;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
  }
  templateDropDown: any[] = [];

  fieldNames = {
    emailFirstRequest: ['Email Name', 'Send Interval'],
    emailReminderForReview: ['Email Name', 'Send Interval', 'Time'],
    emailOneLastReminder: ['Email Name', 'Send Interval', 'Time'],
    emailCreateReminder: ['Email Name', 'Send Interval'],
    smsFirstRequest: ['Template Title', 'Send Interval'],
    smsCreateTemplate: ['Template Title', 'Send Interval'],
  };
  constructor(private dialog: MatDialog, private privateService: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService) {
    if(this.commonService.GetLocalStorage("Country")){
      if (this.commonService.GetLocalStorage("Country") === "India (भारत)") {
        this.getSMSTemplateIn();
      }
    }
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.isEmailTemplateLoaded = false;
    this.isSMSTemplateLoaded = false;
    this.subscription = new Subscription();
  }

  openTemplateModal() {
    const ref: MatDialogRef<EmailTemplateModalComponent> = this.dialog.open(
      EmailTemplateModalComponent,
      {
        width: '800px',
        maxWidth: '90vw',
        // height: '85vh',
        // height:" 702px",

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
    };

    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getEmailTemplate();
        this.getSMSTemplate();
        this.getPrivateFeedback();
      }
    });
  }

  /**
    * Function: Used to call getEmailTemplate from child component.
    */
  onAPIEmailSuccess(): void {
    this.getEmailTemplate();
  }

  /**
    * Function: Used to call getSMSTemplate from child component.
    */
  onAPISmsSuccess(): void {
    this.getSMSTemplate();
  }

    /**
    * Function: Used to call getPrivateFeedback from child component.
    */
    onAPIFeedbackSuccess(): void {
      this.getPrivateFeedback();
    }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
    };
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;
  }

  tabChanged1(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab1 = tabChangeEvent.index;
  }

  tabChanged2(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab2 = tabChangeEvent.index;
  }

  /**
    * Function: Used to get email template data.
    */
  getEmailTemplate(): void {
   
  }

  /**
    * Function: Used to get private feedback.
    */
  getPrivateFeedback(): void {
   
  }

  /**
    * Function: To get SMS template data.
    */
  getSMSTemplate(): void {
  
  }

  /**
 * Function: Fetch SMS template
 * Description: Retrieves SMS template from the server
 */
  getSMSTemplateIn(): void {
  
  }
}
