import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-review-badges-modal',
  templateUrl: './review-badges-modal.component.html',
  styleUrls: ['./review-badges-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReviewBadgesModalComponent implements OnInit {
  key: string;
  profileId: string;
  badgeJsCode: SafeHtml;
  getWidgetBadgeDetailsList: any;
  widgetBadgeDetails: any[];
  getConnectedPlatformLists: any;
  filteredConnectedData: any[];
  selectedData: any[] = [];
  baseUrl: string;
  isShowJsCodeBlock: boolean;

  constructor(public sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public dialogData: any, private commonService: CommonService, private errorHandler: ErrorHandlerService, private privateService: PrivateServices, private clipboard: Clipboard) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.badgeJsCode = '';
    this.widgetBadgeDetails = [];
    this.filteredConnectedData = [];
    this.isShowJsCodeBlock = false;
  }

  platformSelect(event: any) {
    this.selectedData = event.value;
  }

  remove(name: string) {
    this.selectedData = this.selectedData.filter((data) => data.ReviewSiteName != name);
  }

  ngOnInit(): void {
    this.baseUrl = window.location.origin;
    this.getConnectedPlatformSiteLists();
    this.getWidgetBadgeDetails();
  }

  /**
   * Function: gets widget badge api data
   */
  getWidgetBadgeDetails(): void {
   
  }

  /**
   * Function: Generates javascript code for badge
   */
  generateJavascriptCode(): void {
    this.isShowJsCodeBlock = true;

    // Convert ReviewSiteNames into a string array
    const reviewSiteNames: string[] = this.selectedData.map(data => data.ReviewSiteName);
    this.badgeJsCode = `<script data-set="RSW_${this.dialogData.widgetName.replace(/\s+/g, '_').toUpperCase()}">

      var e = document.createElement('script');

      e.type = "text/javascript";

      e.o = "anonymous";

      e.src = "${this.baseUrl}/assets/js/widget/${this.dialogData.widgetName.replace(/\s+/g, '-').toLowerCase()}.js?
      accesskey=${this.dialogData.widget_Unique_Key}&reviewplatform=${reviewSiteNames}";

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
</script>`;
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
   * Function: to show/hide other blocks when get code button is clicked
   */
    backToPreview(): void {
      this.isShowJsCodeBlock = false;
    }
  

  /**
   * Function: gets connected platform api data
   */
  getConnectedPlatformSiteLists(): void {
  
  }
}
