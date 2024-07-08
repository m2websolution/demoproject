import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  VERSION,
} from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AppConstant } from '../../constants';
import { CommonService } from '../../services/common.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { noHtmlTagsValidator } from 'src/app/views/private/no-html-tags.validator';

@Component({
  selector: 'app-custom-link-model',
  templateUrl: './custom-link-model.component.html',
  styleUrls: ['./custom-link-model.component.css'],
})
export class CustomLinkModelComponent {
  @ViewChild('avatarImg', { static: true }) avatarImgElement: any;
  @ViewChild('ckEditor', { static: false }) ckEditor: any;  // Use any for now, adjust the type as needed

  photos: string[] = [];
  photo: string | null = null;
  @Output() photoUpdated = new EventEmitter<string>();
  showAddPhotoOverlay: boolean[] = [];
  name = 'Angular';
  logoLink: string;

  data: any = ``;
  screenSize?: any;
  key: string;
  profileId: string;
  customPlatformModelForm: FormGroup;
  customPlatformModel: any;
  loading: boolean;

  constructor(private layoutService: LayoutService, private fb: FormBuilder, private commonService: CommonService, private dialogRef: MatDialogRef<CustomLinkModelComponent>, private errorHandler: ErrorHandlerService) {
    this.screenSize = this.layoutService.screenSize;
    this.loading = false;
    this.logoLink = '';

    // Initialize the form with a required validator
    this.customPlatformModelForm = this.fb.group({
      SiteName: ['', [Validators.required]],
      SiteUrl: ['', [Validators.required, Validators.pattern('^(https?://)?([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$')]],
      ImageUrl: [''],
      instruction: ['', [Validators.required, noHtmlTagsValidator()]],
    });
  }

  /**
  * Function: Post data to add custom platform review
  */
  addCustomPlatform(): void {
    this.commonService.SpinnerObervable(true);
    this.loading = true; // Set loading to true before making the API call
    this.customPlatformModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.customPlatformModel.ProfileId = this.commonService.GetLocalStorage("profileId");
    this.customPlatformModel.SiteName = this.customPlatformModelForm.get('SiteName').value;
    this.customPlatformModel.SiteUrl = this.customPlatformModelForm.get('SiteUrl').value;
    this.customPlatformModel.ImageUrl = this.logoLink;
    this.customPlatformModel.instruction = this.customPlatformModelForm.get('instruction').value;
  }

  onResize(event: any) {
    this.screenSize = this.layoutService.screenSize;
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
          this.customPlatformModelForm.patchValue({
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
          this.customPlatformModelForm.patchValue({
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
}
