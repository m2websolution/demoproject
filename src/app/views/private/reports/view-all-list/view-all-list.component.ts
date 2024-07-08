import { Component } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { PagerService } from 'src/app/shared/services/pager.service';

@Component({
  selector: 'app-view-all-list',
  templateUrl: './view-all-list.component.html',
  styleUrls: ['./view-all-list.component.css']
})
export class ViewAllListComponent {
  key: string;
  profileId: string;
  allSentiments: any[] = [];
  displayedColumns: string[] = ["word","Count","ReviewSentiment"];
  sentimentReport: any[] = [
    { value: "positive", name: "Positive" },
    { value: "negative", name: "Negative" },
    { value: "mixed", name: "Mixed" }
  ];
  selectedOption: string = 'all';
  pager: any = {};
  pageSize: number = 20;
  pagedItems: any[] = [];

  constructor(private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private commonService: CommonService,
    private pagerService: PagerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.getAllSentiments("all");
  }


  /**
 * Function: Get All Sentiments
 * Description: Retrieves all sentiments for a given profile.
 * @param sentimenttype - Type of sentiment to retrieve
 * @returns void
 */
  getAllSentiments(sentimenttype: string): void {
  
  }

  /**
 * Function: On Selection Change
 * Description: Triggers when the selection changes and retrieves all sentiments for the selected type.
 * @param event - The event object containing the selected value
 * @returns void
 */
  onSelectionChange(event: any): void {
    this.getAllSentiments(event.value);
  }

  /**
 * Function: Set Page
 * Description: Sets the current page of displayed items and updates pagination accordingly.
 * @param page - The page number to set
 * @returns void
 */
  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(
      this.allSentiments.length,
      page,
      true,
      this.pageSize
    );

    if (this.pagedItems) {
      this.pagedItems = this.allSentiments.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }
  }

  /**
 * Function: Set Items Sorting
 * Description: Sets the page size for pagination and updates the pager accordingly.
 * @param data - The page size to set
 * @returns void
 */
  setItemsSorting(data: any) {
    this.pageSize = data;
    this.pager = this.pagerService.getPager(
      this.allSentiments.length,
      1,
      true,
      data
    );

    if (this.pagedItems) {
      this.pagedItems = this.allSentiments.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }
  }
}
