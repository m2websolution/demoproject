import { Component, OnInit, ViewChild } from '@angular/core';
import { PagerService } from 'src/app/shared/services/pager.service';
import {
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { MyReviewActivitiesFormComponent } from 'src/app/shared/components/my-review-card-model/my-review-activities-form/my-review-activities-form.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { AppConstant } from 'src/app/shared/constants';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-private-feedback',
  templateUrl: './private-feedback.component.html',
  styleUrls: ['./private-feedback.component.css'],
})
export class PrivateFeedbackComponent implements OnInit {
  key: string;
  profileId: string;
  loading: boolean;
  isOpenBottomSheet: boolean;
  isFilterApplied: boolean;
  subscription: Subscription;
  getNegativeFeedbackList: any;
  negativeFeedbackModel: any;
  getNegativeFeedbackData: any[] = [];
  @ViewChild('feedbackPaginatorComponent') feedbackPaginatorComponent!: PaginatorComponent;
  constructor(
    private pagerService: PagerService,
    private _bottomSheet: MatBottomSheet,
    private privateService: PrivateServices,
    private commonService: CommonService, private errorHandler: ErrorHandlerService
  ) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.negativeFeedbackModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.negativeFeedbackModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.negativeFeedbackModel.page = 1;
    this.negativeFeedbackModel.pagesize = 20;
    this.isOpenBottomSheet = false;
    this.loading = false;
    this.isFilterApplied = false;
    this.pagedItems = [];
    this.subscription = new Subscription();

    // Initialize pager object
    this.pager = {
      currentPage: 1,
      totalPages: 1, // Default value
      pageSize: this.negativeFeedbackModel.pagesize,
      totalRecords: 0 // Default value, will be updated after API call
    };
  }
  pager: any = {};
  pagedItems: any;
  selectedItem: string = 'Item 1';
  breakpoint: any;
  // private allItems: any = [{ name: 'dev' }, { name: 'dev' }, { name: 'dev' }];


  myReviewProfileCardFooter: any;
  myReviewActivitesPermission: any;

  /**
   * Function: gets Negative Feedback api data
   * @param negativeFeedbackModel: GetNegativeFeedback_Request
   */
  getNegativeFeedbacks(negativeFeedbackModel: any): void {
   
  }

  /**
   *
   * Function: updates Private Feedback based on filters
   * @param filters GetNegativeFeedback_Request
   */
  updateprivateFeedbackFilters(filters: any): void {
    this.negativeFeedbackModel = filters;
    this.isFilterApplied = true;
    this.getNegativeFeedbacks(this.negativeFeedbackModel);
  }

  openBottomSheet(): void {
    this.myReviewActivitesPermission = false;
    this.isOpenBottomSheet = true;
    let sheetRef = this._bottomSheet.open(MyReviewActivitiesFormComponent, {
      data: {
        updateprivateFeedbackFilters: this.updateprivateFeedbackFilters.bind(this), // Pass a reference to the parent method
        myReviewActivitesPermission: this.myReviewActivitesPermission,
        isPrivateFeedbackData: true,
        isOpenBottomSheet: this.isOpenBottomSheet,
        feedbackPaginatorComponent: this.feedbackPaginatorComponent
      },
    });
    sheetRef.afterDismissed().subscribe((data) => {
      this.myReviewActivitesPermission = true;

      if (data && data.message == 'Cancel') {
        alert('Cancel was clicked in bottomsheet');
      }
      if (data && data.message == 'Status') {
        alert('Change Status was clicked in bottomsheet');
      }
    });

    // this._bottomSheet.open(MyReviewActivitiesFormComponent);
  }

  ngOnInit() {
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.commonService.AddLocalStorage('profileId', this.profileId);
        this.negativeFeedbackModel.ProfileId = this.commonService.GetLocalStorage('profileId');
        this.getNegativeFeedbacks(this.negativeFeedbackModel);
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

  /**
   * Function: Sets page number and refresh data
   * @param page page number
   */
  setPage(page: number): void {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    // Recalculate pager based on the total number of items from the API response
    this.pager = this.pagerService.getPager(
      this.getNegativeFeedbackList.Total,
      page,
      true,
      20
    );

    this.pagedItems = this.getNegativeFeedbackData.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    // Update the current page and fetch the data if necessary
    if (page !== this.negativeFeedbackModel.page) {
      this.negativeFeedbackModel.page = page;
      this.getNegativeFeedbacks(this.negativeFeedbackModel);
    }
  }

  /**
   * Function: Sets page size and sorts data based on pagesize
   * @param data page size
   */
  setItemsSorting(data: number) {
    this.pager = this.pagerService.getPager(
      this.getNegativeFeedbackData.length,
      1,
      true,
      data
    );

    this.pagedItems = this.getNegativeFeedbackData.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.negativeFeedbackModel.pagesize = data;
    this.negativeFeedbackModel.page = 1;
    this.getNegativeFeedbacks(this.negativeFeedbackModel);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setItem(item: any) {
    this.selectedItem = item.name;
  }
}
