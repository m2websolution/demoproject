import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-micro-review-modal',
  templateUrl: './micro-review-modal.component.html',
  styleUrls: ['./micro-review-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MicroReviewModalComponent implements OnInit {
  isShowJsCodeBlock: boolean;
  getWidgetReviewSummaryList: any;
  widgetReviewSummary: any;

  // Used any as there are different types of data in dialogData
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.isShowJsCodeBlock = false;
  }

  state: any = {
    fontColor: '#000000',
    backColor: '#ffffff',
  };

  ngOnInit(): void {
    this.getWidgetReviewSummary();
  }

  /**
   * Function: gets review summary api data
   */
  getWidgetReviewSummary(): void {
   
  }

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
  }

  onFieldValuesChanged(event: any) {
    this.state = event;
  }

  /**
   * Function: to show/hide other blocks when js code block is displayed
   * @param event Boolean flag
   */
  showJsBlock(event: boolean): void {
    this.isShowJsCodeBlock = event;
  }
}
