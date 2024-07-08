import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { ReviewPageSettingsComponent } from './review-page-settings/review-page-settings.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})

export class ReviewPageComponent {
  selectedTabEmail?: number = 0;
  key: string;
  layoutList: any[];
  profileId: string;
  landingPageSettings: any;
  reviewPageSettings: any;
  headerOptions: any;
  publicReviewWorkflow: any;
  privateFeedbackWorkflow: any;
  privateFeedbackForm: any;
  layoutOptions: any;
  subscription: Subscription;
  @ViewChild(ReviewPageSettingsComponent) childComponent: ReviewPageSettingsComponent;

  constructor(private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private commonService: CommonService, private clipboard: Clipboard) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getLayoutList();
        this.getReviewPageSettings();
      }
    });

  }

  openedTab: number = 0;
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;
  }

  /**
    * Function: Gets the selected company link
    */
  getLink(): void {
    this.clipboard.copy(this.childComponent.getDataLink());
    this.commonService.SnackObervable('Link copied')
  }

  contentSettingsTab: string[] = [
    'Header Options',
    'Public Review Workflow',
    'Private Feedback Workflow',
    'Private Feedback Form',
    "Layout Option's",
  ];

  /**
   * Function: Gets the layout list
   */
  getLayoutList(): void {
    
  }

  /**
    * Function: Gets the review page settings
    */
  getReviewPageSettings(): void {
    
  }

  /**
 * Function: Checks if a data link is available
 * This function calls a method on a child component to retrieve a data link.
 * It returns true if the link is defined, otherwise false.
 */
  isLinkAvailable(): boolean {
    const link = this.childComponent?.getDataLink();
    return link !== undefined;
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
