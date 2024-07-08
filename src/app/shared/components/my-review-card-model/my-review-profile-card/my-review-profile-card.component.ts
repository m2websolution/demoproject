import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SendManualReviewReplayFormComponent } from '../send-manual-review-replay-form/send-manual-review-replay-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareReviewCardComponent } from '../share-review-card/share-review-card.component';
import { CommonService } from 'src/app/shared/services/common.services';
import { PrivateServices } from '../../../../services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ConfirmationModelComponent } from '../../confirmation-model/confirmation-model.component';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-my-review-profile-card',
  templateUrl: './my-review-profile-card.component.html',
  styleUrls: ['./my-review-profile-card.component.css'],
})
export class MyReviewProfileCardComponent {
  @ViewChild('descriptionElement') descriptionElement: ElementRef | undefined;
  @ViewChild('replyElement') replyElement: ElementRef | undefined;
  @ViewChild('tagInput') tagInput: ElementRef;
  @Input() paginatorComponent!: PaginatorComponent;
  @Input() feedbackPaginatorComponent!: PaginatorComponent;

  name = 'Angular';
  key: string;
  profileId: string;
  showMore: boolean;
  isDescriptionShowButton: boolean;
  isReplyShowButton: boolean;
  updateReviewSettingMessage: string;
  myReviewModel: any;
  privateFeedbackModel: any;
  addTagModel: any;
  convertFeedbackToReviewModel: any;
  @Input() isPrivateFeedbackData: boolean;
  @Input() isMyReviewsData: boolean;
  @Input() privateFeedbackData: any;
  @Input() data: any;
  @Output() updateFilter = new EventEmitter<any>;
  @Output() updateprivateFeedbackFilter = new EventEmitter<any>;

  rating: any;
  votes: any;
  average: any;
  sentimentPermissions: any;
  text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  constructor(private commonService: CommonService, private dialog: MatDialog, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.sentimentPermissions = JSON.parse(this.commonService.GetLocalStorage('Permissions'));
    this.showMore = false;
    this.isDescriptionShowButton = false;
    this.isReplyShowButton = false;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.myReviewModel.Key = this.key;
    this.myReviewModel.ProfileId = this.profileId;
    this.updateReviewSettingMessage = '';
    this.privateFeedbackModel.Key = this.key;
    this.privateFeedbackModel.ProfileId = this.profileId;
  }

  @Input() myReviewProfileCardFooter: any;
  setValues(e: any) {
    this.rating = e.rating;
    this.average = e.average;
    this.votes = e.votes;
  }

  /**
   * Function: Toggles button to expand/collapse content
   */
  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  ngAfterViewInit(): void {
    if (this.paginatorComponent) {
      this.myReviewModel.page = this.paginatorComponent.getCurrentPageNumber();
      this.myReviewModel.pagesize = this.paginatorComponent.getCurrentPageSize();
    }
    if(this.feedbackPaginatorComponent){
      this.privateFeedbackModel.page = this.feedbackPaginatorComponent.getCurrentPageNumber();
      this.privateFeedbackModel.pagesize = this.feedbackPaginatorComponent.getCurrentPageSize();
    }
    setTimeout(() => {
      this.isLongDescription();
    }, 0);
  }

  /**
   * Function: Used to trim 4 line description and add read more/less button
   */
  isLongDescription(): void {
    const descElement = this.descriptionElement.nativeElement;
    const maxHeight = 24 * 4; // Max height for 4 lines as one line height is 24
    const descriptionHeight = descElement.scrollHeight;
    if (this.replyElement) {
      const rplElement = this.replyElement.nativeElement;
      const replyHeight = rplElement.scrollHeight;

      if (replyHeight > maxHeight) {
        this.isReplyShowButton = true;
      }
      else {
        this.isReplyShowButton = false;
      }
    }

    if (descriptionHeight > maxHeight) {
      // Description has more than 4 lines
      // Show the button
      this.isDescriptionShowButton = true;
    }
    else {
      this.isDescriptionShowButton = false;
    }
  }

  /**
   * Function: Restricts user to input characters only
   * @param event : Keyboard event to check character input
   */
  onKeyPress(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/[A-Za-z0-9]/.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   * Function: adds review tag in my reviews
   * @param event: keyboard event
   * @param reviewId: review id
   */
  addTag(event: KeyboardEvent, reviewId: number): void {
    if (event.key === 'Tab' || event.key === 'Enter') {
      const tagValue = (this.tagInput.nativeElement as HTMLInputElement).value;
      // Call your API with the tagValue here
      this.commonService.SpinnerObervable(true);
      this.addTagModel.Key = this.key;
      this.addTagModel.ProfileId = this.profileId;
      this.addTagModel.ReviewId = reviewId;
      this.addTagModel.Tag = tagValue;
     
      // Clear the input field after calling the API
      (this.tagInput.nativeElement as HTMLInputElement).value = '';
    }
  }

  /**
   * Function: Removes tag from my reviews page
   * @param tagId Id of tag
   */
  deleteTag(tagId: number): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: ' Are You Sure You Want to Delete this Tag?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.SpinnerObervable(true);
        
      }
    });
  }

  /**
   * Function: Deletes manual review
   * @param reviewId manual review id
   */
  deleteManualReview(reviewId: number): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: ' Are You Sure You Want to Delete this review?',
          buttonText: 'Delete anyway',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.SpinnerObervable(true);
        
      }
    });
  }

  /**
   * Function: Gets app response from api call and updates my reviews page accordingly
   * @param res AppResponse of api call
   */
  updateMyReviews(res: any): void {
    // Update the filters and trigger the API call in MyReviewComponent
    this.updateFilter.emit(this.myReviewModel);
    this.commonService.SpinnerObervable(false);
    this.commonService.SnackObervable(res.message);
  }

  /**
   * Function: Gets app response from api call and updates private feedback page accordingly
   * @param res AppResponse of api call
   */
  updateFeedBacks(res: any): void {
    // Update the filters and trigger the API call in PrivateFeedbackComponent
    this.updateprivateFeedbackFilter.emit(this.privateFeedbackModel);
    this.commonService.SpinnerObervable(false);
    this.commonService.SnackObervable(res.message);
  }

  /**
   * Function: Updates review settings
   * @param reviewId: review id
   * @param hasShownOnWidget: boolean flag
   */
  updateReviewSettings(reviewId: number, hasShownOnWidget: boolean): void {
    let showOnWidget: boolean = false;
    if (hasShownOnWidget) {
      this.updateReviewSettingMessage = 'Are you sure want to remove review from Widget?';
      showOnWidget = false;
    }
    else {
      this.updateReviewSettingMessage = 'Are you sure want to add review to Widget?';
      showOnWidget = true;
    }
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: this.updateReviewSettingMessage,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.SpinnerObervable(true);
        
      }
    });
  }

  /**
   * Function: Opens dialog for sending reply to review
   * @param data GetReviews data object
   */
  SendManualReviewReplayeDialog(data: any) {
    const ref: MatDialogRef<SendManualReviewReplayFormComponent> =
      this.dialog.open(SendManualReviewReplayFormComponent, {
        width: '98%',
        maxWidth: '780px',
        height: '95%',
        maxHeight: '95%',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          reviewData: data,
          paginatorComponent: this.paginatorComponent
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      });
  }

  /**
   * Function: Opens dialog for sending reply to Private Feedback
   * @param privateFeedbackData Private Feedback data object
   */
  SendPrivateFeedbackReplyDialog(privateFeedbackData: any): void {
    const ref: MatDialogRef<SendManualReviewReplayFormComponent> =
      this.dialog.open(SendManualReviewReplayFormComponent, {
        width: '98%',
        maxWidth: '780px',
        height: '95%',
        maxHeight: '95%',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          privateFeedbackData: privateFeedbackData,
          isPrivateFeedbackData: this.isPrivateFeedbackData,
          paginatorComponent: this.feedbackPaginatorComponent
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      });
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.commonService.SpinnerObervable(true);
          this.updateFeedBacks(result);
        }
      });
  }

  /**
   * Opens dialog for share on social page
   * @param data GetReviews data object
   */
  ShareReviewCardDialog(data: any): void {
    const ref: MatDialogRef<ShareReviewCardComponent> = this.dialog.open(
      ShareReviewCardComponent,
      {
        width: ' 940px',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          reviewData: data
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
   * Function to Show Feedback details in popup
   * @param privateFeedbackData Negative Feedback Data object
   */
  viewMoreDetails(privateFeedbackData: any): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '60%',
        maxWidth: '480px',
        height: '80%',
        panelClass: 'custom-container',
        data: {
          privateFeedbackData: privateFeedbackData,
          isPrivateFeedbackData: this.isPrivateFeedbackData
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
   * Function: Converts feedback to review
   * @param feedbackId Feedback Id
   */
  moveToReviews(feedbackId: number): void {
    const ref: MatDialogRef<ConfirmationModelComponent> =
      this.dialog.open(ConfirmationModelComponent, {
        width: '30%',
        maxWidth: '400px',
        height: '95%',
        maxHeight: '95%',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to move feedback to review?',
          feedbackId: feedbackId,
          paginatorComponent: this.feedbackPaginatorComponent
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.SpinnerObervable(true);
        this.convertFeedbackToReviewModel.Key = this.key;
        this.convertFeedbackToReviewModel.Id = feedbackId;
       
      }
    });
  }
}
