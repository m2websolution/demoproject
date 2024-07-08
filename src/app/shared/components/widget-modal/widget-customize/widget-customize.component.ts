import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-widget-customize',
  templateUrl: './widget-customize.component.html',
  styleUrls: ['./widget-customize.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetCustomizeComponent implements OnInit {
  openedTab: number = 0;
  selectedPageSize: string;
  selectedRating: string;
  executeReviewWithNoText: boolean;
  showReviewSummary: boolean;
  autoPlayCarousel: boolean;
  getReviewsForWidgetList: any;
  reviewsForWidget: any;
  selectedWidgetPosition: string;
  isShowJsCodeBlock: boolean;
  @Output() customizationDataChanged = new EventEmitter<any>();
  @Output() showReviewSummaryData = new EventEmitter<boolean>();
  @Output() getSelectedWidgetPosition = new EventEmitter<string>();
  @Output() isShowJsBlock = new EventEmitter<boolean>();
  @Output() autoPlayCarouselData = new EventEmitter<boolean>();
  state: any = {
    fontColor: '#000',
    backColor: '#FFF',
    date_disc: '#FAA81A',
  };
  widgetJsCode: SafeHtml;
  @Input() widgetData: any; // Used any as widgetData has multiple types data
  @Input() totalReviews: number;
  ratingOverviewList: any;
  ratingOverviewDetails: any;
  @Output() ratingOverviewDataChanged = new EventEmitter<any>();
  baseUrl: string;

  constructor(public sanitizer: DomSanitizer, private commonService: CommonService, private clipboard: Clipboard, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.widgetJsCode = '';
    this.selectedPageSize = '';
    this.selectedRating = '';
    this.executeReviewWithNoText = false;
    this.showReviewSummary = false;
    this.selectedWidgetPosition = 'left';
    this.isShowJsCodeBlock = false;
    this.autoPlayCarousel = false;
  }

  ngOnInit(): void {
    this.baseUrl = window.location.origin;
    this.selectedPageSize = '20';
    this.selectedRating = '1';
    this.getReviewsList();
    this.getWidgetRatingOverviews();
  }

  /**
   * Function: Gets selected widget position value
   */
  getSelectedWidget(): void {
    this.getSelectedWidgetPosition.emit(this.selectedWidgetPosition);
  }

  /**
   * Function: show/hide overall ratings block on slide toggle
   */
  toggleOverallRatings(): void {
    this.showReviewSummaryData.emit(this.showReviewSummary);
  }

  /**
   * Function: show/hide overall ratings block on slide toggle
   */
  autoPlayCarouselCard(): void {
    this.autoPlayCarouselData.emit(this.autoPlayCarousel);
  }

  /**
   * Function: Calls this method when theme tab changes
   * @param tabChangeEvent Event when theme tab changes
   */
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;

    if (this.openedTab == 0) {
      this.state = {
        fontColor: '#000',
        backColor: '#FFF',
        date_disc: '#71717A',
      };
    } else if (this.openedTab == 1) {
      this.state = {
        backColor: '#000',
        fontColor: '#FFF',
        date_disc: '#71717A',
      };
    } else {
      this.state = {
        fontColor: '#FAA81A',
        backColor: '#27272A',
        date_disc: '#71717A',
      };
    }
    this.fieldValuesChanged.emit(this.state);
  }

  /**
   * Function: Gets list of Reviews for Widgets
   */
  getReviewsList(): void {
    
  }

  @Output() fieldValuesChanged = new EventEmitter<{
    fontColor: string;
    backColor: string;
    date_disc: string;
  }>();

  field1Value: string = '';
  field2Value: string = '';

  /**
   * Function: Generates javascript code for badge
   */
  generateJavascriptCode(widgetName: string): void {
    this.isShowJsCodeBlock = true;
    this.isShowJsBlock.emit(this.isShowJsCodeBlock);
    if (widgetName === 'Masonry Grid') {
      this.widgetJsCode = `<script data-set="RSW_REVIEW_GRID">
      var e = document.createElement('script');

      e.type = "text/javascript";

      e.o = "anonymous";

      e.src = "${this.baseUrl}/assets/js/widget/widget-grid.js?
      accesskey=${this.widgetData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}
      &totalreviews=${this.totalReviews}&excludereviewnotext=${this.executeReviewWithNoText}&ministars=${this.selectedRating}&issummary=${this.showReviewSummary}";

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
    }
    else if (widgetName === 'Micro Review Count') {
      this.widgetJsCode = `<script data-set="RSW_MICRO_REVIEW">
      var e = document.createElement('script');

      e.type = "text/javascript";

      e.o = "anonymous";

      e.src = "${this.baseUrl}/assets/js/widget/micro-review-count.js?
      accesskey=${this.widgetData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}";

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
    }
    else if (widgetName === 'Floating Review') {
      this.widgetJsCode = `<script src= "${this.baseUrl}/assets/js/widget/floating-review.js?
      accesskey=${this.widgetData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}&totalreviews=${this.ratingOverviewList.Data.totalReviews}
      &excludereviewnotext=${this.executeReviewWithNoText}&ministars=${this.selectedRating}&position=${this.selectedWidgetPosition}" defer async></script>`;
    }
    else if (widgetName === 'List View') {
      this.widgetJsCode = `<script data-set="RSW_REVIEW_LIST">
      var e = document.createElement('script');

      e.type = "text/javascript";

      e.o = "anonymous";

      e.src = "${this.baseUrl}/assets/js/widget/widget-list.js?
      accesskey=${this.widgetData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}
      &totalreviews=${this.totalReviews}&excludereviewnotext=${this.executeReviewWithNoText}&ministars=${this.selectedRating}&issummary=${this.showReviewSummary}";

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
    }
    else if (widgetName === 'Carousel') {
      this.widgetJsCode = `<script data-set="RSW_REVIEW_CAROUSEL">
      var e = document.createElement('script');

      e.type = "text/javascript";

      e.o = "anonymous";

      e.src = "${this.baseUrl}/assets/js/widget/widget-carousel.js?
      accesskey=${this.widgetData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}
      &totalreviews=${this.ratingOverviewList.Data.totalReviews}&excludereviewnotext=${this.executeReviewWithNoText}&ministars=${this.selectedRating}&autolplay=${this.autoPlayCarousel}";

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
    }
    else if (widgetName === 'Rating Overview') {
      this.widgetJsCode = `<script data-set="RSW_REVIEW_OVERVIEW">
      var e = document.createElement('script');

      e.type = "text/javascript";

      e.o = "anonymous";

      e.src = "${this.baseUrl}/assets/js/widget/review-overview.js?
      accesskey=${this.widgetData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}";

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
    }
  }

  /**
   * Function: to show/hide other blocks when get code button is clicked
   */
  backToPreview(): void {
    this.isShowJsCodeBlock = false;
    this.isShowJsBlock.emit(this.isShowJsCodeBlock);
  }

  /**
   * Function: Copies JS code to clipboard
   * @param content: content which can be copied
   */
  copyJsCode(content: SafeHtml): void {
    this.clipboard.copy(`${content}`);
    this.commonService.SnackObervable('Text copied');
  }

  /**
   * Function: gets rating overview api data
   */
  getWidgetRatingOverviews() : void {
   
  }

  changehandler(event: any) {

    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
      date_disc: event.target.value,
    };

    this.fieldValuesChanged.emit(this.state);
  }

  @Input() footer: boolean = true;
}
