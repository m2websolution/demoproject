import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { WebSolutionComponent } from '../modals/web-solution/web-solution.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddManualReviewComponent } from '../modals/add-manual-review/add-manual-review.component';
import { CommonService } from 'src/app/shared/services/common.services';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-review-screen-setting3',
  templateUrl: './review-screen-setting3.component.html',
  styleUrls: ['./review-screen-setting3.component.css']
})
export class ReviewScreenSetting3Component {
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

  starwidth: any = { width: ' 110px', height: '110px' };
  @Input() reviewScreenStars: any;
  @Input() nid: string;
  @Input() id: number;
  @Input() slug: string;
  pageActivity: string;

  rating: any;
  votes: any;
  average: any;
  setValues(e: any) {
    this.rating = e;
    this.average = e.average;
    this.votes = e.votes;
    this.pageActivity = `Clicked on ${this.rating}`;
    if (this.nid === '') {
      this.reviewButtonClickQR();
    } else if (this.nid) {
      this.reviewButtonClick();
    }
    switch (this.reviewScreenStars.Threshold) {
      case '2 star or more to review': {
        if (this.rating >= 2) {
          this.onWebSolution();
        } else {
          this.addManualReviewFormDialog();
        }
        break;
      }
      case '3 star or more to review': {
        if (this.rating >= 3) {
          this.onWebSolution();
        } else {
          this.addManualReviewFormDialog();
        }
        break;
      }
      case '4 star or more to review': {
        if (this.rating >= 4) {
          this.onWebSolution();
        } else {
          this.addManualReviewFormDialog();
        }
        break;
      }
      case '5 star to review': {
        if (this.rating === 5) {
          this.onWebSolution();
        } else {
          this.addManualReviewFormDialog();
        }
        break;
      }
      case 'All to review': {
        this.onWebSolution();
        break;
      }
      default: {
        this.addManualReviewFormDialog();
      }
    }
  }

  constructor(private dialog: MatDialog, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.pageActivity = '';
  }

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.starwidth = { width: ' 110px', height: '100px' };
    } else if (window.innerWidth > 1200) {
      this.starwidth = { width: ' 110px', height: '100px' };
    } else {
      this.starwidth = { width: ' 50px', height: '50px' };
    }
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
    } else if (window.innerWidth > 1200) {
      this.starwidth = { width: ' 110px', height: '100px' };
    } else {
      this.starwidth = { width: ' 50px', height: '50px' };
    }
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
          data: this.reviewScreenStars,
          nid: this.nid,
          id: this.id,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.componentInstance.notifyParent.subscribe(() => {
      // Call a method in the parent component
      this.addManualReviewFormDialog();
    });
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
          message: 'Are you sure to cancel without saving the data?',
          reviewScreenDetails: this.reviewScreenStars,
          nid: this.nid,
          slug: this.slug,
          id: this.id
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.componentInstance.notifyParent.subscribe(() => {
      // Call a method in the parent component
      this.onWebSolution();
    });

    // Added to the model of the thank you message
    ref.afterClosed().subscribe(result => {
      if (result) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
          top: '1%', // Position at the top of the screen
        };
          this.dialog.open(this.dialogContent, dialogConfig);
        } else {
        this.commonService.SpinnerObervable(false);
      }
    });
  }
}
