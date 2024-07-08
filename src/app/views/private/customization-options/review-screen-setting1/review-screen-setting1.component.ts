import { Component } from '@angular/core';
import { AddManualReviewComponent } from '../modals/add-manual-review/add-manual-review.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebSolutionComponent } from '../modals/web-solution/web-solution.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { AppConstant } from 'src/app/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-screen-setting1',
  templateUrl: './review-screen-setting1.component.html',
  styleUrls: ['./review-screen-setting1.component.css']
})
export class ReviewScreenSetting1Component {
  key: string;
  profileId: string;
  reviewScreenDetails: any;
  slug: string;
  nid: string;
  id: number;
  employeeName: string;
  department: string;
  pageActivity: string;

  constructor(private dialog: MatDialog, private privateService: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private route: ActivatedRoute, private router: Router) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.pageActivity = '';
    this.nid = '';
    this.employeeName = '';
    this.department = '';
    this.route.params.subscribe((params) => {
      this.slug = params['shortName'];
      const queryParams = this.route.snapshot.queryParams;
      if ('utm_source' in queryParams) {
        if ('dept' in queryParams) {
          this.employeeName = queryParams['emp'];
          this.department = queryParams['dept'];
        }
      } else {
        this.nid = params['nid'];
      }
    });
  }

  ngOnInit() {
    this.getReviewScreenDetails();
    if (this.nid) {
      this.getWelcomeUser();
    } else if (this.nid === '') {
      this.getWelcomeUserQR();
    }
    setTimeout(() => {
      if (this.router.url.includes("#h")) {
        this.handleLikeReview();
      } else if (this.router.url.includes("#u")) {
        this.handleDislikeReview();
      }
    }, 3000);
  }

  /**
   * Function: Registers the user when landing page is opened.
   */
  getWelcomeUser(): void {
   
  }

  /**
  * Function: Registers the user when landing page is opened through QR.
  */
  getWelcomeUserQR(): void {
   
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
    * Function: To get otpin page settings details
    */
  getReviewScreenDetails(): void {
   
  }

  onWebSolution() {
    const ref: MatDialogRef<WebSolutionComponent> = this.dialog.open(
      WebSolutionComponent,
      {
        width: '520px',
        height: 'auto',
        // height: '500px',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          data: this.reviewScreenDetails,
          nid: this.nid,
          id: this.id,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.componentInstance.notifyParent.subscribe(() => {
      // Call a method in the parent component
      this.AddManualReviewFormDialog();
    });
  }
  AddManualReviewFormDialog() {
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
          reviewScreenDetails: this.reviewScreenDetails,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.componentInstance.notifyParent.subscribe(() => {
      // Call a method in the parent component
      this.onWebSolution();
    });
  }

  /**
  * Function: Handles Thumbs up click scenario in layout page.
  */
  handleLikeReview(): void {
    this.pageActivity = 'Click on thumbs up';
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if (this.nid) {
      this.reviewButtonClick();
    }

    if (this.reviewScreenDetails.Threshold === 'Thumbs up to review' || this.reviewScreenDetails.Threshold === 'All to review') {
      this.onWebSolution();
    } else {
      this.AddManualReviewFormDialog();
    }
  }

  /**
  * Function: Handles Thumbs down click scenario in layout page.
  */
  handleDislikeReview(): void {
    this.pageActivity = 'Click on thumbs down';
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if (this.nid) {
      this.reviewButtonClick();
    }
    if (this.reviewScreenDetails.Threshold === 'Thumbs up to review' || this.reviewScreenDetails.Threshold === 'All to private feedback') {
      this.AddManualReviewFormDialog();
    } else {
      this.onWebSolution();
    }
  }
}
