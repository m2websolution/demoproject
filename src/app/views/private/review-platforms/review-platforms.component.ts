import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomLinkModelComponent } from 'src/app/shared/components/custom-link-model/custom-link-model.component';
import { TabService } from 'src/app/shared/components/tabs/tab.service';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-platforms',
  templateUrl: './review-platforms.component.html',
  styleUrls: ['./review-platforms.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReviewPlatformsComponent implements OnInit {
  screenSize?: any;
  key: string;
  profileId: string;
  getReviewLists: any;
  getReviewsData: any[] = [];
  collectAndgetReviewsData: any[] = [];
  getConnectedPlatformLists: any;
  filteredGetReviewsData: any[] = [];
  filteredCollectAndgetReviewsData: any[] = [];
  filteredConnectedData: any[] = [];
  searchQuery: string;
  subscription: Subscription;
  reviewConnectedCount: any;

  constructor(
    public tabService: TabService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private commonService: CommonService,
    private errorHandler: ErrorHandlerService
  ) {
    this.searchQuery = '';
    this.screenSize = this.layoutService.screenSize;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.commonService.AddLocalStorage('profileId', this.profileId)
        this.getSiteLists();
        this.getConnectedPlatformSiteLists();
        this.subscribeToDataChanges();
        this.filterReviewSiteData();
      }
    });
  }

  /**
   * Function: subscribes data from connected platform api
   */
  subscribeToDataChanges(): void {
    this.commonService.getConnectedPlatformListData().subscribe((data) => {
      this.getConnectedPlatformLists = data;
      this.filterReviewSiteData();
    });
  }

  /**
   * Function: Filters ReviewSiteList based on connected platform data
   */
  filterReviewSiteData(): void {
    if (this.getConnectedPlatformLists && this.getConnectedPlatformLists.Data) {
      this.filteredConnectedData = this.getConnectedPlatformLists.Data;
      const connectedPlatforms = this.getConnectedPlatformLists.Data.map((item) => item.ReviewSiteName.toLowerCase());
      this.filteredGetReviewsData = this.getReviewsData.filter((item) =>
        connectedPlatforms.every((connectedItem) => connectedItem.toLowerCase() !== item.ReviewSiteName.toLowerCase())
      );
      this.filteredCollectAndgetReviewsData = this.collectAndgetReviewsData.filter((item) =>
        connectedPlatforms.every((connectedItem) => connectedItem.toLowerCase() !== item.ReviewSiteName.toLowerCase())
      );
    }
    else if (this.getReviewsData || this.collectAndgetReviewsData) {
      this.filteredGetReviewsData = this.getReviewsData;
      this.filteredCollectAndgetReviewsData = this.collectAndgetReviewsData;
    }
  }

  /**
   * Function: gets connected platform api data
   */
  getConnectedPlatformSiteLists(): void {
  
  }

  /**
   * Function: gets reviewSiteList api data
   */
  getSiteLists(): void {
  
  }

  /**
   * Function: Filters the review site data based on search query.
   */
  filteredItems(): void {
    this.filterReviewSiteData();
    this.filteredGetReviewsData = this.filteredGetReviewsData.filter(
      item => item.ReviewSiteName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredCollectAndgetReviewsData = this.filteredCollectAndgetReviewsData.filter(
      item => item.ReviewSiteName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredConnectedData = this.filteredConnectedData.filter(
      item => item.ReviewSiteName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  customLinkDialog() {
    const ref: MatDialogRef<CustomLinkModelComponent> = this.dialog.open(
      CustomLinkModelComponent,
      {
        width: '98%',
        maxWidth: '720px',
        height: '98%',
        panelClass: 'custom-container',

        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }
  onCloseTab(tabIndex: number) {
    this.tabService.closeTab(tabIndex);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
