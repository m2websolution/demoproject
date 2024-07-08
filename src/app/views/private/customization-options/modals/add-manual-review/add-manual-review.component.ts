import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-add-manual-review',
  templateUrl: './add-manual-review.component.html',
  styleUrls: ['./add-manual-review.component.css']
})
export class AddManualReviewComponent {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter<any>();
  manualReviewForm: FormGroup;
  pageActivity: string;
  isButtonDisabled: boolean;
  isRatingValid: boolean;
  formSubmitted: boolean;

  // Used any as there are different data types and object in dialog data.
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private route: ActivatedRoute, private dialogRef: MatDialogRef<AddManualReviewComponent>) {
    this.manualReviewForm = this.fb.group({
      Message: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      NId: '',
      Slug: '',
      Rating: ['', [Validators.required]],
    });
    this.isButtonDisabled = true;
    this.isRatingValid = true;
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.manualReviewForm.get('Slug').setValue(this.dialogData.slug);
    if(this.dialogData.nid){
      this.manualReviewForm.get('NId').setValue(this.dialogData.nid);
    }else{
      this.manualReviewForm.get('NId').setValue('');
    }
    if (!this.dialogData.reviewScreenDetails.ReviewPageSettings.EmailRequired || !this.dialogData.reviewScreenDetails.ReviewPageSettings.EmailShowField) {
      this.manualReviewForm.get('Email').clearValidators();
      this.manualReviewForm.get('Email').updateValueAndValidity();
    }
    if (!this.dialogData.reviewScreenDetails.ReviewPageSettings.PhoneNumberRequired || !this.dialogData.reviewScreenDetails.ReviewPageSettings.PhoneNumberShowField) {
      this.manualReviewForm.get('Phone').clearValidators();
      this.manualReviewForm.get('Phone').updateValueAndValidity();
    }

    if (!this.dialogData.reviewScreenDetails.ReviewPageSettings.NameRequired || !this.dialogData.reviewScreenDetails.ReviewPageSettings.NameShowField) {
      this.manualReviewForm.get('Name').clearValidators();
      this.manualReviewForm.get('Name').updateValueAndValidity();
    }
  }

  rating: any;
  votes: any;
  average: any;
  setValues(e: any) {
    this.rating = e;
    this.average = e.average;
    this.votes = e.votes;
    this.manualReviewForm.get('Rating').setValue(e);
    this.isRatingValid = true;
  }

  /**
  * Function: Calls both function on submit.
  */
  submit(): void {
    this.pageActivity = 'Click on private feedback';
    this.submitPrivateFeedback();
    if (this.dialogData.nid === '') {
      this.reviewSiteButtonClickQR();
    } else if (this.dialogData.nid) {
      this.reviewSiteButtonClick();
    }
  }

  /**
  * Function: Opens review modal.
  */
  redirectToReview(): void {
    this.dialogRef.close();
    this.notifyParent.emit(true);
  }

  /**
  * Function: To send clicked platform activity.
  */
  reviewSiteButtonClick(): void {
    this.formSubmitted = true;
    if (this.manualReviewForm.valid) {
      
    } else {
      this.manualReviewForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
    }
  }

  /**
 * Function: Sends selected connected platform activity for QR.
 * @param pageActivity: selected connected platform activity.
 */
  reviewSiteButtonClickQR(): void {
   
  }

  /**
    * Function: submits private feedback details
    */
  submitPrivateFeedback(): void {
    this.formSubmitted = true;
    if (this.manualReviewForm.get('Rating').value === '') {
      this.isRatingValid = false;
    }
    if (this.manualReviewForm.valid) {
     
    } else {
      this.manualReviewForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
    }
  }
}
