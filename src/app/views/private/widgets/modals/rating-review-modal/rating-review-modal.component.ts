import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-review-modal',
  templateUrl: './rating-review-modal.component.html',
  styleUrls: ['./rating-review-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RatingReviewModalComponent {
  state: any = {
    fontColor: '#000000',
    backColor: '#ffffff',
  };
  ratingOverviewData: any;
  averageRating: number;
  calculatedRatingCount: Array<number>;
  isShowJsCodeBlock: boolean;

  // Given any to dialogData as it has multiple types of data
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any){
    this.averageRating = 0;
    this.calculatedRatingCount = [];
    this.isShowJsCodeBlock = false;
  }


  /**
   * Function: Fetches ReviewsForWidget response from child component
   * @param event ReviewsForWidget response
   */
  widgetDataChanged(event: any): void {
    this.ratingOverviewData = event;
    this.averageRating = parseFloat(this.ratingOverviewData.avgRating);
    this.calculatedRatingCount = this.ratingOverviewData.rating.map(item => (item.count * 100)/ Number(this.ratingOverviewData.totalReviews));
  }
  changehandler(event: any) {

    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
  }

  /**
   * Function: to show/hide other blocks when js code block is displayed
   * @param event Boolean flag
   */
  showJsBlock(event: boolean): void {
    this.isShowJsCodeBlock = event;
  }

  onFieldValuesChanged(event: any) {
    this.state = event;
  }
}
