import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TabService } from 'src/app/shared/components/tabs/tab.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-review-collector-modal',
  templateUrl: './review-collector-modal.component.html',
  styleUrls: ['./review-collector-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReviewCollectorModalComponent implements OnInit{
  reviewCollectorJsCode: SafeHtml;
  isShowJsCodeBlock: boolean;
  getWidgetReviewSummaryList: any;
  widgetReviewSummary: any;
  baseUrl: string;

  // Used any as dialogData has multiple types of data
  constructor(public sanitizer: DomSanitizer, private commonService: CommonService, private clipboard: Clipboard, public tabService: TabService, @Inject(MAT_DIALOG_DATA) public dialogData: any, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.reviewCollectorJsCode = '';
    this.isShowJsCodeBlock = false;
  }
  openedTab: number = 0;
  state: any = {
    fontColor: '#000000',
    backColor: '#FFFFFF',
  };

  tabData: any = ['LIGHT', 'DARK', 'CUSTOM'];

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
  }

  ngOnInit(): void {
    this.baseUrl = window.location.origin;
    this.getWidgetReviewSummary();
  }  

  /**
   * Function: gets review summary api data
   */
  getWidgetReviewSummary(): void {
   
  }

  /**
   * Function: Generates javascript code for badge
   */
  generateJavascriptCode(): void {
    this.isShowJsCodeBlock = true;
    this.reviewCollectorJsCode = `<script data-set="RSW_${this.dialogData.widgetName.replace(/\s+/g, '_').toUpperCase()}">
    var e = document.createElement('script');

    e.type = "text/javascript";

    e.o = "anonymous";

    e.src = "${this.baseUrl}/assets/js/widget/${this.dialogData.widgetName.replace(/\s+/g, '-').toLowerCase()}.js?
    accesskey=${this.dialogData.widget_Unique_Key}&backgroundcolor=${this.state.backColor}&textcolor=${this.state.fontColor}";

    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
  }

  /**
   * Function: to show/hide other blocks when get code button is clicked
   */
  backToPreview(): void {
    this.isShowJsCodeBlock = false;
  }

  /**
   * Function: Copies JS code to clipboard
   * @param content: content which can be copied
   */
  copyJsCode(content: SafeHtml): void {
    this.clipboard.copy(`${content}`);
    this.commonService.SnackObervable('Text copied');
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;

    if (this.openedTab == 0) {
      this.state = {
        fontColor: '#000000',
        backColor: '#FFFFFF',
      };
    } else if (this.openedTab == 1) {
      this.state = {
        backColor: '#000000',
        fontColor: '#FFFFFF',
      };
    } else {
      this.state = {
        fontColor: '#FAA81A',
        backColor: '#27272A',
      };
    }
  }
}
