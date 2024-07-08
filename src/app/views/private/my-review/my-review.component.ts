import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PagerService } from 'src/app/shared/services/pager.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MyReviewActivitiesFormComponent } from 'src/app/shared/components/my-review-card-model/my-review-activities-form/my-review-activities-form.component';
import { AddManualReviewFormComponent } from 'src/app/shared/components/my-review-card-model/add-manual-review-form/add-manual-review-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/common.services';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MyReviewComponent implements OnInit {
  key: string;
  profileId: string;
  loading: boolean;
  autoResponseMessage: string;
  isOpenBottomSheet: boolean;
  subscription: Subscription;
  getMyReviewList: any;
  myReviewModel: any;
  autoResponseModel: any;
  getMyReviewsData: any[] = [];
  getReviewsData: any[] = [];
  @ViewChild('paginatorComponent') paginatorComponent!: PaginatorComponent;
  constructor(
    private pagerService: PagerService,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private privateService: PrivateServices,
    private commonService: CommonService, private errorHandler: ErrorHandlerService
  ) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.isOpenBottomSheet = false;
    this.myReviewModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.myReviewModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.myReviewModel.page = 1;
    this.myReviewModel.pagesize = 20;
    this.loading = false;
    this.subscription = new Subscription();

    // Initialize pager object
    this.pager = {
      currentPage: 1,
      totalPages: 1, // Default value
      pageSize: this.myReviewModel.pagesize,
      totalRecords: 0 // Default value, will be updated after API call
    };
  }

  myReviewProfileCardFooter: any;
  myReviewActivitesPermission: any;

  showPlatformReviewCount: number = 4;

  /**
   * Function: gets reviewSiteList api data
   * @param myReviewModel: GetMyReviews_Request
   */
  getMyReviewsLists(myReviewModel: any): void {
  
  }

  /**
   * Function: Sets autoRespond flag using this api
   * @param autoResponse: boolean flag for auto response
   */
  setAutoResponse(autoResponse: boolean): void {
    if (autoResponse) {
      this.autoResponseMessage = 'Enabling AI-powered auto response will automatically respond to newly published Google and Facebook reviews.';
    }
    else {
      this.autoResponseMessage = 'Disabling AI-powered auto response prevents it from automatically responding to newly published Google and Facebook reviews.';
    }
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: this.autoResponseMessage,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.autoResponseModel.Key = this.key;
        this.autoResponseModel.ProfileId = this.profileId;
        this.autoResponseModel.HasAutoResponse = autoResponse;
        this.commonService.SpinnerObervable(true);
      } else {
        this.getMyReviewList.AutoResponse = !autoResponse
      }
    });
  }

  /**
   *
   * Function: updates myReviewModel based on filters
   * @param filters GetMyReviews_Request
   */
  updateFilters(filters: any): void {
    this.myReviewModel = filters;
    this.getMyReviewsLists(this.myReviewModel);
  }

  openBottomSheet(): void {
    this.myReviewActivitesPermission = true;
    this.isOpenBottomSheet = true;
    let sheetRef = this._bottomSheet.open(MyReviewActivitiesFormComponent, {
      data: {
        updateFilters: this.updateFilters.bind(this), // Pass a reference to the parent method
        myReviewActivitesPermission: this.myReviewActivitesPermission,
        isOpenBottomSheet: this.isOpenBottomSheet,
        getReviewsData: this.getReviewsData
      },
    });
    sheetRef.afterDismissed().subscribe((data) => {
      if (data && data.message == 'Cancel') {
        alert('Cancel was clicked in bottomsheet');
      }
      if (data && data.message == 'Status') {
        alert('Change Status was clicked in bottomsheet');
      }
    });
  }

  pager: any = {};
  pagedItems: any;
  selectedItem: string = 'Item 1';

  breakpoint: any;

  selectedPlatformData?: number = 0;
  selectPlatform = (id: number): void => {
    this.selectedPlatformData = id;
  };

  ngOnInit() {
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.commonService.AddLocalStorage('profileId', this.profileId);
        this.myReviewModel.ProfileId = this.commonService.GetLocalStorage('profileId');
        this.getMyReviewsLists(this.myReviewModel);
        this.setPage(1);
      }
    });

    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 1;
    }
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 1;
    }
  }

  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    // Recalculate pager based on the total number of items from the API response
    this.pager = this.pagerService.getPager(
      this.getMyReviewList.Total,
      page,
      true,
      20
    );

    this.pagedItems = this.getMyReviewsData.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    // Update the current page and fetch the data if necessary
    if (page !== this.myReviewModel.page) {
      this.myReviewModel.page = page;
      this.getMyReviewsLists(this.myReviewModel);
    }
  }

  setItemsSorting(data: number) {
    this.pager = this.pagerService.getPager(
      this.getMyReviewsData.length,
      1,
      true,
      data
    );

    this.pagedItems = this.getMyReviewsData.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.myReviewModel.pagesize = data;
    this.myReviewModel.page = 1;
    this.getMyReviewsLists(this.myReviewModel);
  }

  setItem(item: any) {
    this.selectedItem = item.name;
  }
  AddManualReviewFormDialog() {
    const ref: MatDialogRef<AddManualReviewFormComponent> = this.dialog.open(
      AddManualReviewFormComponent,
      {
        width: '720px',
        height: '90vh',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          myReviewComponent: this,
          paginatorComponent: this.paginatorComponent
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
