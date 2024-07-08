import { Component, Input } from '@angular/core';
import { AddManualReviewComponent } from '../modals/add-manual-review/add-manual-review.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebSolutionComponent } from '../modals/web-solution/web-solution.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-review-screen-setting4',
  templateUrl: './review-screen-setting4.component.html',
  styleUrls: ['./review-screen-setting4.component.css']
})
export class ReviewScreenSetting4Component {

  @Input() reviewScreenFaces: any;
  @Input() nid: string;
  @Input() id: number;
  @Input() slug: string;
  pageActivity: string;

  constructor(private dialog: MatDialog, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.pageActivity = '';
  }

  /**
  * Function: Opens the dialog for review platform.
  */
  onWebSolution(): void {
    const ref: MatDialogRef<WebSolutionComponent> = this.dialog.open(
      WebSolutionComponent,
      {
        width: '520px',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          data: this.reviewScreenFaces,
          nid: this.nid,
          id: this.id,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
  * Function: Sends page activity on review click through QR code.
  */
  reviewButtonClickQR(): void {
   
  }

  /**
   * Function: Sends page activity on review click.
   */
  reviewButtonClick(): void {
   
  }

  /**
    * Function: Opens the dialog for private feedback.
    */
  addManualReviewFormDialog(): void {
    const ref: MatDialogRef<AddManualReviewComponent> = this.dialog.open(
      AddManualReviewComponent,
      {
        width: '720px',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          nid: this.nid,
          slug: this.slug,
          id: this.id,
          reviewScreenDetails: this.reviewScreenFaces,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
  * Function: Handles happy face review click.
  */
  happyFaceReview(): void {
    this.pageActivity = 'Clicked on happy face';
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if (this.nid) {
      this.reviewButtonClick();
    }
    if (this.reviewScreenFaces.Threshold === 'Happy face to review' || this.reviewScreenFaces.Threshold === 'Happy or neutral face to review' || this.reviewScreenFaces.Threshold === 'All to review') {
      this.onWebSolution();
    } else {
      this.addManualReviewFormDialog();
    }
  }

  /**
  * Function: Handles neutral face review click.
  */
  neutralFaceReview(): void {
    this.pageActivity = 'Clicked on neutral face';
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if (this.nid) {
      this.reviewButtonClick();
    }
    if (this.reviewScreenFaces.Threshold === 'Happy or neutral face to review' || this.reviewScreenFaces.Threshold === 'All to review') {
      this.onWebSolution();
    } else {
      this.addManualReviewFormDialog();
    }
  }

  /**
  * Function: Handles bad face review click.
  */
  badFaceReview(): void {
    this.pageActivity = 'Clicked on bad face';
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if (this.nid) {
      this.reviewButtonClick();
    }
    if (this.reviewScreenFaces.Threshold === 'All to review') {
      this.onWebSolution();
    } else {
      this.addManualReviewFormDialog();
    }
  }
}
