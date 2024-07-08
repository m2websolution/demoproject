import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { MyReviewComponent } from 'src/app/views/private/my-review/my-review.component';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Component({
  selector: 'app-add-manual-review-form',
  templateUrl: './add-manual-review-form.component.html',
  styleUrls: ['./add-manual-review-form.component.css'],
})
export class AddManualReviewFormComponent {
  @ViewChild('avatarImg', { static: true }) avatarImgElement: any;
  rating: number;
  loading: boolean;
  key: string;
  profileId: string;
  logoLink: string;
  myReviewModel: any;
  addManualReviewForm: FormGroup;
  addManualReviewModel: any;
  showAddPhotoOverlay: boolean[] = [];
  photos: string[] = [];
  photo: string | null = null;
  @Output() photoUpdated = new EventEmitter<string>();

  constructor(private dialogRef: MatDialogRef<AddManualReviewFormComponent>, @Inject(MAT_DIALOG_DATA) public myReviewComponentData: { myReviewComponent: MyReviewComponent }, @Inject(MAT_DIALOG_DATA) public paginatorData: { paginatorComponent: PaginatorComponent }, private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.loading = false;
    this.rating = 0;
    this.logoLink = '';
    /**
     * Initialize form with validator
     */
    this.addManualReviewForm = this.fb.group({
      FirstName: ['', Validators.required],
      Comment: ['', Validators.required],
      ReviewDate: ['', Validators.required],
      LastName: [''],
      ImageUrl: ['']
    });
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.myReviewModel.Key = this.key;
    this.myReviewModel.ProfileId = this.profileId;
  }

  ngAfterViewInit(): void {
    if (this.paginatorData.paginatorComponent) {
      this.myReviewModel.page = this.paginatorData.paginatorComponent.getCurrentPageNumber();
      this.myReviewModel.pagesize = this.paginatorData.paginatorComponent.getCurrentPageSize();
    }
  }

  /**
   * Function: sets rating number
   * @param e rating number
   */
  setValues(e: number): void {
    this.rating = e;
  }

  /**
   * Function: Adds photo
   * @param event Event
   */
  addPhoto(event: Event): void {
    if (this.photos.length === 1) {
      return;
    }
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.photos.push(result);
        // Convert the selected file to a base64 string
        this.convertFileToBase64(file).then((logoLink: string) => {
          // Send the base64 string to the backend
          this.logoLink = logoLink;
          // Update the form control with the file data
          this.addManualReviewForm.patchValue({
            ImageUrl: result
          });
        });
      }
    };
  }

  /**
   * Function: Used to edit photo
   * @param event Event
   * @param i index
   */
  editPhoto(event: Event, i: number): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.photos.splice(i, 1, result);
        // Convert the selected file to a base64 string
        this.convertFileToBase64(file).then((logoLink: string) => {
          // Send the base64 string to the backend
          this.logoLink = logoLink;
          // Update the form control with the file data
          this.addManualReviewForm.patchValue({
            ImageUrl: result
          });
        });
      }
    };
  }

  /**
   * Function: Used to delete uploaded photo
   * @param i index
   */
  removePhoto(i: number): void {
    this.photos.splice(i, 1);
  }

  /**
   * Function: converts file into base64 string
   * @param file which will be converted into base64
   * @returns base64 string
   */
  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoLink = reader.result as string;
        // Remove the data URI prefix
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Function: adds manual review in my review page.
   */
  addManualReview(): void {
    if (this.rating < 1) {
      return; // Exit early if rating is not selected
    }
    this.commonService.SpinnerObervable(true);
    this.loading = true; // Set loading to true before making the API call
    this.addManualReviewModel.Key = this.key;
    this.addManualReviewModel.ProfileId = this.profileId;
    this.addManualReviewModel.Name = this.addManualReviewForm.get('FirstName').value + ' ' + this.addManualReviewForm.get('LastName').value;
    this.addManualReviewModel.Comment = this.addManualReviewForm.get('Comment').value;
    this.addManualReviewModel.ReviewDate = this.addManualReviewForm.get('ReviewDate').value;
    this.addManualReviewModel.ReviewRating = this.rating;
    this.addManualReviewModel.ImageUrl = this.logoLink;
   
  }
}
