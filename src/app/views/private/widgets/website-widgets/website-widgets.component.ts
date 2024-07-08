import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewCollectorModalComponent } from '../modals/review-collector-modal/review-collector-modal.component';
import { MasonryGridModalComponent } from '../modals/masonry-grid-modal/masonry-grid-modal.component';
import { CarouselModalComponent } from '../modals/carousel-modal/carousel-modal.component';
import { ListViewModalComponent } from '../modals/list-view-modal/list-view-modal.component';
import { FloatingReviewModalComponent } from '../modals/floating-review-modal/floating-review-modal.component';
import { MicroReviewModalComponent } from '../modals/micro-review-modal/micro-review-modal.component';
import { RatingReviewModalComponent } from '../modals/rating-review-modal/rating-review-modal.component';
import { ReviewBadgesModalComponent } from '../modals/review-badges-modal/review-badges-modal.component';
import { CommonService } from 'src/app/shared/services/common.services';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { AppConstant } from 'src/app/shared/constants';
import { Subscription } from 'rxjs';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-widgets',
  templateUrl: './website-widgets.component.html',
  styleUrls: ['./website-widgets.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WebsiteWidgetsComponent implements OnInit {
  screenSize?: any;
  key: string;
  profileId: string;
  getWebsiteWidgetPermissionList: any;
  websiteWidgetPermissions: any;
  subscription: Subscription;
  permissionsString: string;
  permissions: any = {};
  socialVisible: boolean = true;
  userType: string;

  data: any = [
    {
      number: 5,
      value: 5,
      total: 51,
    },
    {
      number: 4,
      value: 1.5,
      total: 2,
    },
    {
      number: 3,
      value: 0,
      total: 0,
    },
    {
      number: 2,
      value: 1.5,
      total: 1,
    },
    {
      number: 1,
      value: 0,
      total: 0,
    },
  ];

  constructor(private layoutService: LayoutService, private dialog: MatDialog, public router: Router, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.screenSize = this.layoutService.screenSize;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.subscription = new Subscription();
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.userType = this.commonService.GetLocalStorage('userType');
  }

  ngOnInit(): void {
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getWebsiteWidgetPermissions();
      }
    });

    if (!this.permissions.HasWebsiteWidget && this.userType === 'Business User' || this.userType === 'Agency User') {
      this.socialVisible = false;
    }
  }

  /**
   * Function: gets Negative Feedback api data
   */
  getWebsiteWidgetPermissions(): void {
   
  }

  /**
   * Function: Opens review collector widget model
   * @param isAllow boolean flag for permission
   * @param widgetName widget name
   */
  OpenReviewCollectorModal(isAllow: boolean, widgetName: string) {
    const ref: MatDialogRef<ReviewCollectorModalComponent> = this.dialog.open(
      ReviewCollectorModalComponent,
      {
        width: '840px',
        maxHeight: '96vh',
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens masnory grid widget model
   * @param isAllow boolean flag for permission
   * @param widgetName widget name
   */
  OpenMasnoryGridModal(isAllow: boolean, widgetName: string): void {
    const ref: MatDialogRef<MasonryGridModalComponent> = this.dialog.open(
      MasonryGridModalComponent,
      {
        width: '1560px',
        maxHeight: '96vh',
        // height:" 702px",
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens carousel widget model
   * @param isAllow boolean flag for permission
   * @param widgetName widget name
   */
  OpenCarouselModal(isAllow: boolean, widgetName: string): void {
    const ref: MatDialogRef<CarouselModalComponent> = this.dialog.open(
      CarouselModalComponent,
      {
        width: '1560px',
        // height: '842px !important',
        maxHeight: '96vh',
        // height:" 702px",
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens floating review widget model
   * @param isAllow boolean flag for permission
   * @param widgetName widget name
   */
  OpenFloatingReviewModal(isAllow: boolean, widgetName: string): void {
    const ref: MatDialogRef<FloatingReviewModalComponent> = this.dialog.open(
      FloatingReviewModalComponent,
      {
        width: '1560px',
        height: '842px !important',
        maxHeight: '96vh',
        // height:" 702px",
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens listview widget model
   * @param isAllow boolean flag for permission
   * @param widgetName widget name
   */
  OpenListViewModal(isAllow: boolean, widgetName: string): void {
    const ref: MatDialogRef<ListViewModalComponent> = this.dialog.open(
      ListViewModalComponent,
      {
        width: '1560px',
        maxHeight: '96vh',
        // height:" 702px",
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens rating overview widget model
   * @param isAllow boolean flag
   * @param widgetName widget name
   */
  OpenRatingOverviewModal(isAllow: boolean, widgetName: string): void {
    const ref: MatDialogRef<RatingReviewModalComponent> = this.dialog.open(
      RatingReviewModalComponent,
      {
        width: '1560px',
        maxHeight: '96vh',
        // height: ' 702px !important',
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens micro review count widget model
   * @param isAllow boolean flag
   * @param widgetName widget name
   */
  OpenMicroReviewModal(isAllow: boolean, widgetName: string) {
    const ref: MatDialogRef<MicroReviewModalComponent> = this.dialog.open(
      MicroReviewModalComponent,
      {
        width: '1560px',
        maxHeight: '96vh',
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

  /**
   * Function: Opens review badge widget model
   * @param isAllow boolean flag for permission
   * @param widgetName widget name
   */
  OpenReviewBadgesModal(isAllow: boolean, widgetName: string): void {
    const ref: MatDialogRef<ReviewBadgesModalComponent> = this.dialog.open(
      ReviewBadgesModalComponent,
      {
        width: '1560px',
        maxHeight: '96vh',
        // height:" 702px",
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isAllow: isAllow,
          widgetName: widgetName,
          widget_Unique_Key: this.websiteWidgetPermissions.widget_Unique_Key
        }
      }
    );
  }

   /**
  * Function: Show the upgrade plan popup.
  */
   openPermissionDialog(): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(ConfirmationModelComponent, {
      width: '50%',
      maxWidth: '480px',
      height: '50%',
      panelClass: 'custom-container',
      data: {
        message: 'upgrade',
      },
      backdropClass: 'confirmDialogComponent',
      hasBackdrop: true,
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(
          ['/admin'],
          { queryParams: { redirectPath: 'upgrade' } }
        );
      } else {
        this.commonService.SpinnerObervable(false);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onResize(event: any) {
    this.screenSize = this.layoutService.screenSize;
  }
}
