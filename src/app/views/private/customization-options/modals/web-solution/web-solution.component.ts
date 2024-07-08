import { Component, EventEmitter, Inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-web-solution',
  templateUrl: './web-solution.component.html',
  styleUrls: ['./web-solution.component.css'],
})
export class WebSolutionComponent {
  @Output() notifyParent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;
  landingPage: boolean;
  pageActivity: string;

  // Used any as there are different data types and object in dialog data.
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private dialog: MatDialog, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private dialogRef: MatDialogRef<WebSolutionComponent>) {
    this.landingPage = true;
    this.pageActivity = '';
    this.dialogData.data.ReviewSource.forEach(element => {
      element.linkClicked = false;
    });
   }
  connectedPlatformCount: number = 4;
  breakpoint: any;

  /**
  * Function: Redirects to selected platform review page.
  * @param GetConnectedPlatformList: selected connected platform.
  */
  redirectToLink(link: any): void {
    this.dialogData.data.ReviewSource.find(ojb => ojb.ReviewSiteName === link.ReviewSiteName)['linkClicked'] = true;
    if (this.dialogData.data.OpenSameTab) {
      window.location.href = link.SiteURL;
    } else {
      window.open(link.SiteURL, '_blank');
      const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '1%', // Position at the top of the screen
    };

      this.dialog.open(this.dialogContent, dialogConfig);
    }
    if (this.dialogData.nid === '') {
      this.reviewSiteButtonClickQR(`Click on ${link.ReviewSiteName}`);
    } else if(this.dialogData.nid) {
      this.reviewSiteButtonClick(`Click on ${link.ReviewSiteName}`);
    }
  }

  /**
  * Function: Sends selected connected platform activity.
  * @param pageActivity: selected connected platform activity.
  */
  reviewSiteButtonClick(pageActivity: string): void {
    
  }

  /**
  * Function: Redirects to review modal.
  */
  redirectToPrivateFeedback(): void {
    this.dialogRef.close();
    this.notifyParent.emit(true);
  }

   /**
  * Function: Sends selected connected platform activity for QR.
  * @param pageActivity: selected connected platform activity.
  */
   reviewSiteButtonClickQR(pageActivity: string): void {
   
  }
}
