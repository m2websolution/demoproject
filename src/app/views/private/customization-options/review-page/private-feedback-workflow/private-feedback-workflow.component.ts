import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-private-feedback-workflow',
  templateUrl: './private-feedback-workflow.component.html',
  styleUrls: ['./private-feedback-workflow.component.css']
})
export class PrivateFeedbackWorkflowComponent {
 @Input() privateFeedback: any;
 privateFeedbackWorkflowForm: FormGroup;

 constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
  this.privateFeedbackWorkflowForm = this.fb.group({
    key: '',
    profileId: '',
    ReviewHeaderMessage: ['', [Validators.required]],
    ThankyouMessage: ['', [Validators.required]],
    PrivateReviewMessage: ['', [Validators.required]],
    PrivateReviewLinkText: ['', [Validators.required]],
    HidePublicReviewMessage: [false, [Validators.required]],
  });
  this.privateFeedbackWorkflowForm.get('key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
  this.privateFeedbackWorkflowForm.get('profileId').setValue(this.commonService.GetLocalStorage('profileId'));
}

ngOnInit() {
  if (this.privateFeedbackWorkflowForm) {
    this.privateFeedbackWorkflowForm.get('ReviewHeaderMessage').setValue(this.privateFeedback.ReviewHeaderMessage);
    this.privateFeedbackWorkflowForm.get('ThankyouMessage').setValue(this.privateFeedback.ThankyouMessage);
    this.privateFeedbackWorkflowForm.get('PrivateReviewMessage').setValue(this.privateFeedback.PrivateReviewMessage);
    this.privateFeedbackWorkflowForm.get('PrivateReviewLinkText').setValue(this.privateFeedback.PrivateReviewLinkText);
    this.privateFeedbackWorkflowForm.get('HidePublicReviewMessage').setValue(this.privateFeedback.HidePublicReviewMessage);
  }
}

/**
 * Function: Update the update private feedback workflow options
 */
submit(): void {
  
}
}
