import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-public-review-workflow',
  templateUrl: './public-review-workflow.component.html',
  styleUrls: ['./public-review-workflow.component.css']
})
export class PublicReviewWorkflowComponent {
  @Input() publicReview: any;
  PublicReviewWorkflow: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.PublicReviewWorkflow = this.fb.group({
      key: '',
      profileId: '',
      ReviewRequestMessage: ['', [Validators.required]],
      LeaveReviewMessage: ['', [Validators.required]],
      PublicReviewMessage: ['', [Validators.required]],
      PublicReviewLinkText: ['', [Validators.required]],
      PublicReviewAppreciateMessage: ['', [Validators.required]],
      PublicReviewThankyouMessage: ['', [Validators.required]],
    });

    this.PublicReviewWorkflow.get('key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.PublicReviewWorkflow.get('profileId').setValue(this.commonService.GetLocalStorage('profileId'));
  }

  ngOnInit() {
    if (this.publicReview) {
      this.PublicReviewWorkflow.get('ReviewRequestMessage').setValue(this.publicReview.ReviewRequestMessage);
      this.PublicReviewWorkflow.get('LeaveReviewMessage').setValue(this.publicReview.LeaveReviewMessage);
      this.PublicReviewWorkflow.get('PublicReviewMessage').setValue(this.publicReview.PublicReviewMessage);
      this.PublicReviewWorkflow.get('PublicReviewLinkText').setValue(this.publicReview.PublicReviewLinkText);
      this.PublicReviewWorkflow.get('PublicReviewAppreciateMessage').setValue(this.publicReview.PublicReviewAppreciateMessage);
      this.PublicReviewWorkflow.get('PublicReviewThankyouMessage').setValue(this.publicReview.PublicReviewThankyouMessage);
    }
  }

  /**
   * Function: Update the up options
   */
  submit(): void {
  
  }
}
