import { Component, Input } from '@angular/core';
import { PagerService } from 'src/app/shared/services/pager.service';
import { WebSolutionComponent } from '../modals/web-solution/web-solution.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddManualReviewComponent } from '../modals/add-manual-review/add-manual-review.component';
import { CommonService } from 'src/app/shared/services/common.services';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-review-screen-setting2',
  templateUrl: './review-screen-setting2.component.html',
  styleUrls: ['./review-screen-setting2.component.css'],
})
export class ReviewScreenSetting2Component {
  pager: any = {};
  pagedItems: any;
  updatedPage: any = 1;
  @Input() reviewScreenNps: any;
  @Input() nid: string;
  @Input() id: number;
  @Input() slug: string;
  @Input() nps: number;
  pageActivity: string;
  myReviewProfileData = [
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
    { page: 1 },
  ];

  constructor(private pagerService: PagerService, private dialog: MatDialog, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.pageActivity = '';
  }

  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(
      this.myReviewProfileData.length,
      page,
      true,
      1
    );

    this.pagedItems = this.myReviewProfileData.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  onSetPagination(item: any) {
    this.updatedPage = item;
    this.handleSelectedNps();
  }
  ngOnInit() {
    this.setPage(1);
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
          data: this.reviewScreenNps,
          nid: this.nid,
          id: this.id,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
  * Function: Opens the dialog for private feedback.
  */
  addManualReviewFormDialog() {
    const ref: MatDialogRef<AddManualReviewComponent> = this.dialog.open(
      AddManualReviewComponent,
      {
        width: '720px',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          reviewScreenDetails: this.reviewScreenNps,
          nid: this.nid,
          slug: this.slug,
          id: this.id,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
   * Function: Sends page activity on review click.
   */
  reviewButtonClick(): void {
   
  }

  /**
  * Function: Sends page activity on review click through QR code.
  */
  reviewButtonClickQR(): void {
   
  }

  /**
    * Function: Handles the selected NPS review.
    */
  handleSelectedNps(): void {
    this.pageActivity = `Clicked on ${this.updatedPage} `;
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if(this.nid) {
      this.reviewButtonClick();
    }
    if (this.reviewScreenNps.Threshold === 'All to review') {
      this.onWebSolution();
    } else if (this.reviewScreenNps.Threshold === '6 or more to review') {
      if (this.updatedPage >= 6) {
        this.onWebSolution();
      }
      else {
        this.addManualReviewFormDialog();
      }

    } else if (this.reviewScreenNps.Threshold === '9 or more to review') {
      if (this.updatedPage >= 9) {
        this.onWebSolution();
      }
      else {
        this.addManualReviewFormDialog();
      }

    } else {
      this.addManualReviewFormDialog();
    }
  }
}
