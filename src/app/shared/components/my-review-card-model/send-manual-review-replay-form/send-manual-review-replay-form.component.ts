import { Component, ElementRef, EventEmitter, Inject, Output, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyReviewComponent } from 'src/app/views/private/my-review/my-review.component';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-send-manual-review-replay-form',
  templateUrl: './send-manual-review-replay-form.component.html',
  styleUrls: ['./send-manual-review-replay-form.component.css'],
})
export class SendManualReviewReplayFormComponent {
  breakpoint: any;
  showMore: boolean;
  feedback: string;
  pendingReponseCredit: number;
  selectedTemplateData: string;
  sendReplyOnReviewForm: FormGroup;
  replyNegativeFeedbackForm: FormGroup
  sendReplyOnReviewRequest: any;
  replyNegativeFeedbackRequest: any;
  autoGenerateResponse: any;
  reviewReplyTemplateResponse: any;
  reviewReplyTemplateModel: any[] = [];
  myReviewModel: any;
  privateFeedbackModel: any;

  @Output() updateprivateFeedbackFilter = new EventEmitter<any>;
  @Output() updateFilter = new EventEmitter<any>;
  @ViewChild('templateDiv') templateDiv: ElementRef;

  @ViewChild('descriptionElement') descriptionElement: ElementRef | undefined;
  isShowButton: boolean;
  //dialogData: any Given any type as it contains message and data object both.
  constructor(private dialogRef: MatDialogRef<SendManualReviewReplayFormComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any, @Inject(MAT_DIALOG_DATA) public paginatorData: { paginatorComponent: PaginatorComponent }, private fb: FormBuilder, private privateService: PrivateServices, private commonService: CommonService, private renderer: Renderer2, private errorHandler: ErrorHandlerService) {
    this.showMore = false;
    this.isShowButton = false;
    this.feedback = '';
    this.selectedTemplateData = '';
    this.pendingReponseCredit = parseFloat(this.commonService.GetLocalStorage('pendingReponseCredit'));
    this.myReviewModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.myReviewModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.autoGenerateResponse.pendingResponseCredit = this.pendingReponseCredit;
    /**
     * Initialize sendReplyOnReviewForm with validator
     */
    this.sendReplyOnReviewForm = this.fb.group({
      Comment: ['', Validators.required]
    });
    /**
     * Initialize replyNegativeFeedbackForm with validator
     */
    this.replyNegativeFeedbackForm = this.fb.group({
      Comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 1;
    }
    this.getReviewReplyTemplates();
  }

  /**
   * Function: Toggles button to expand/collapse content
   */
  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  /**
   *Function: Adds short template in feedback section.
   */
  insertTemplateData(): void {
    let textarea: HTMLTextAreaElement;
    if(this.dialogData.isPrivateFeedbackData){
      textarea = document.querySelector('.reply-feedback-container') as HTMLTextAreaElement;
    }
    else{
      textarea = document.querySelector('.reply-text-container') as HTMLTextAreaElement;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end, textarea.value.length);

    // Check if space exists before and after the selectedTemplateData
    const hasSpaceBefore = start > 0 && /\s$/.test(textBefore);
    const hasSpaceAfter = end < textarea.value.length && /^\s/.test(textAfter);

    // Add space before and after if necessary
    const templateDataWithSpaces = (hasSpaceBefore ? '' : ' ') + this.selectedTemplateData + (hasSpaceAfter ? '' : ' ');

    // Modify the textarea value with the template data
    textarea.value = textBefore.replace(/\s$/, '') + templateDataWithSpaces + textAfter.replace(/^\s/, '');
    textarea.setSelectionRange(start + templateDataWithSpaces.length, start + templateDataWithSpaces.length);

    // Update the Comment form control value
    if(this.dialogData.isPrivateFeedbackData){
      this.replyNegativeFeedbackForm.get('Comment').setValue(this.selectedTemplateData);
    }
    else{
      this.sendReplyOnReviewForm.get('Comment').setValue(this.selectedTemplateData);
    }
  }

  ngAfterViewInit(): void {
    if (this.paginatorData.paginatorComponent) {
      this.myReviewModel.page = this.paginatorData.paginatorComponent.getCurrentPageNumber();
      this.myReviewModel.pagesize = this.paginatorData.paginatorComponent.getCurrentPageSize();
      this.privateFeedbackModel.page = this.paginatorData.paginatorComponent.getCurrentPageNumber();
      this.privateFeedbackModel.pagesize = this.paginatorData.paginatorComponent.getCurrentPageSize();
    }
    setTimeout(() => {
      this.isLongDescription();
    }, 100); // Delay of 100 milliseconds
  }

  /**
   * Function: Used to trim 4 line description and add read more/less button
   */
  isLongDescription(): void {
    if (this.descriptionElement && this.descriptionElement.nativeElement) {
      const element = this.descriptionElement.nativeElement;
      const maxHeight = 24 * 4; // Max height for 4 lines as one line height is 24
      const descriptionHeight = element.scrollHeight;

      if (descriptionHeight > maxHeight || this.showMore) {
        // Description has more than 4 lines or is expanded
        // Show the button
        this.isShowButton = true;
      } else {
        this.isShowButton = false;
      }
    }
  }

  /**
   * Function: Sends reply to review
   * @param reviewId: review id
   */
  sendReplyOnReview(reviewId: string): void {
    this.sendReplyOnReviewRequest.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.sendReplyOnReviewRequest.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.sendReplyOnReviewRequest.ReviewId = reviewId;
    this.sendReplyOnReviewRequest.Comment = this.sendReplyOnReviewForm.get('Comment').value;
    this.commonService.SpinnerObervable(true);

  }

  /**
   * Function: Sends reply to feedback
   * @param feedbackId: Feedback id
   */
  sendReplyOnFeedback(feedbackId: number): void {
    this.replyNegativeFeedbackRequest.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.replyNegativeFeedbackRequest.Id = feedbackId;
    this.replyNegativeFeedbackRequest.Comment = this.replyNegativeFeedbackForm.get('Comment').value;
    this.commonService.SpinnerObervable(true);
  
  }

  /**
   * Function: To get review reply template
   */
  getReviewReplyTemplates(): void {
  
  }

  /**
   *Function: Generates autoresponse to reply in review
   * @param reviewId: review id
   */
  generateAutoResponse(reviewId: number): void {
   
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 1;
    }
  }
}
