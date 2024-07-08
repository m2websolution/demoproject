import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CollectPlatformModelComponent } from 'src/app/shared/components/collect-platform-model/collect-platform-model.component';
import { DisConnectedPlatformModelComponent } from 'src/app/shared/components/dis-connected-platform-model/dis-connected-platform-model.component';
import { CommonService } from '../../services/common.services';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { AppConstant } from '../../constants';

@Component({
  selector: 'app-connected-platforms-card',
  templateUrl: './connected-platforms-card.component.html',
  styleUrls: ['./connected-platforms-card.component.css'],
})
export class ConnectedPlatformsCardComponent {
  @Input() data: any;
  @Input() connected: any;
  @Input() getconnected: any;
  @Input() isLandingPage: boolean = false;
  permissionsString: string;
  permissions: any = {};
  reviewConnectVisible: boolean = true;
  userType: string;
  reviewPlatformLimit:Number;
  key: string;
  profileId: string;
  reviewConnectedCount: any;
  reviewCount: Number;

  constructor(private commonService: CommonService, private dialog: MatDialog, public router: Router, private errorHandler: ErrorHandlerService) { 
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
  }

  ngOnInit() {
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.reviewPlatformLimit = this.permissions.ReviewPlatformLimit
    this.userType = this.commonService.GetLocalStorage('userType');
    this.reviewCount = parseInt(this.commonService.GetLocalStorage('reviewConnectedCount'), 10) || 0;
  }

  /**
   * Confirmation dialog
   * @param CollectModelData: Used for passing GetReviewSiteLists object
   */
  confirmDialog(CollectModelData: any): void {
    //It will open disconnect platform model
    const ref: MatDialogRef<DisConnectedPlatformModelComponent> =
      this.dialog.open(DisConnectedPlatformModelComponent, {
        width: '98%',
        maxWidth: '616px',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          header: CollectModelData.ReviewSiteName,
          id: CollectModelData.Id,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      });
  }

  /**
   *
   * collecteDialog(): Used for opening dialog for connecting platform / and Upgrade account popup
   * @param CollectModelData: Used for passing GetReviewSiteLists object
   */
  collecteDialog(CollectModelData: any): void {
    this.reviewCount = parseInt(this.commonService.GetLocalStorage('reviewConnectedCount'), 10) || 0;
    if (this.userType) {
      if (this.reviewPlatformLimit > this.reviewCount && this.userType != 'Agency User') {
        if (!this.isLandingPage) {
          const ref: MatDialogRef<CollectPlatformModelComponent> = this.dialog.open(
            CollectPlatformModelComponent,
            {
              width: '98%',
              maxWidth: '720px',
              data: CollectModelData,
              backdropClass: 'confirmDialogComponent',
              hasBackdrop: true,
            }
          );
        }
      } else if (this.reviewPlatformLimit == 0) {   // Show review platform to agency users
        if (!this.isLandingPage) {
          const ref: MatDialogRef<CollectPlatformModelComponent> = this.dialog.open(
            CollectPlatformModelComponent,
            {
              width: '98%',
              maxWidth: '720px',
              data: CollectModelData,
              backdropClass: 'confirmDialogComponent',
              hasBackdrop: true,
            }
          );
        }
      }
      else {
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
    }
  }

  /**
   *
   * collecteDialog(): Used for opening dialog for connecting platform
   * @param CollectModelData: Used for passing GetReviewSiteLists object
   */
  collectEditDialog(CollectEditModelData: any): void {
    //It will open connect platform model
    const ref: MatDialogRef<CollectPlatformModelComponent> = this.dialog.open(
      CollectPlatformModelComponent,
      {
        width: '98%',
        maxWidth: '720px',
        data: CollectEditModelData,
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }
}
