import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-brand-information',
  templateUrl: './brand-information.component.html',
  styleUrls: ['./brand-information.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BrandInformationComponent {
  selectedRadio: any;
  selectedStatus: any = 1;
  brandingForm: FormGroup;
  brandingDetails: any;
  fileExtension: string;
  logoLink: string;
  getAction: string;


  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.brandingForm = this.fb.group({
      Key: '',
      LogoUrl: '',
      BrandName: ['', [Validators.required]],
      BrandPrimaryColor: ['#196cfa', [Validators.required]],
      BrandSecondaryColor: ['#faa81a', [Validators.required]],
    });

    this.brandingForm.get('Key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.fileExtension = '';
    this.logoLink = '';
  }

  ngOnInit() {
    this.getBrandingDetails();
  }


  /**
   * Function: To get branding details.
   */
  getBrandingDetails(): void {
  
  }


  /**
   * Function: Updates the branding details.
   */
  submit(action: string): void {
    this.commonService.SpinnerObervable(true);
    if (action === 'resetButton') {
      this.getAction = action;
      const defaultPrimaryColor = '#196cfa';
      const defaultSecondaryColor = '#faa81a';
      // Use setValue or patchValue to update form controls
      this.brandingForm.patchValue({
        BrandPrimaryColor: defaultPrimaryColor,
        BrandSecondaryColor: defaultSecondaryColor
      });
      this.updateBrandingDetails();
    } else {
      this.updateBrandingDetails();
    }
  }


  /**
 * Function: Set branding details.
 */
  updateBrandingDetails(): void {
    
  }


  /**
    * Function: Get the last part after the last dot
    * @param fileName: image file name
    * @returns file name extension
    */
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  /**
    * Function: Convert the selected file to a base64 string.
    * @param file: selected file
    * @returns image link
    */
  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoLink = reader.result as string;
        resolve(this.logoLink);
        // Remove the data URI prefix
      };
      reader.onerror = (error) => {
        this.commonService.SnackObervable('Error reading file')
        reject(error);
      }
      reader.readAsDataURL(file);
    });
  }

  state: any = {
    primaryColor: '#196cfa',
    seondaryColor: '#faa81a',
  };

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
    if (event.target.id === 'seondaryColor') {
      this.brandingForm.get('BrandSecondaryColor').setValue(event.target.value)
    }
    if (event.target.id === 'primaryColor') {
      this.brandingForm.get('BrandPrimaryColor').setValue(event.target.value)
    }
  }

  toggleScreen() {
    this.toggleDetailScreen.emit();
  }
  @ViewChild('avatarImg', { static: true }) avatarImgElement: any;

  @Input() photo: any;
  @Output() photoUpdated = new EventEmitter<string>();
  showAddPhotoOverlay = false;
  addPhoto(event: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarImgElement.nativeElement.src = fileReader.result;
    };
    const readFile = fileReader.readAsDataURL(event.target.files[0]);
    this.photo = 'xxxx';
    this.photoUpdated.emit(this.photo);

    //converting image to base64 string
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const selectedFile: File = files[0];
      this.fileExtension = this.getFileExtension(selectedFile.name);

      // Convert the selected file to a base64 string
      this.convertFileToBase64(selectedFile).then((logoLink: string) => {
        // Send the base64 string to the backend
        this.brandingForm.get('LogoUrl').setValue(logoLink);
        this.commonService.SpinnerObervable(false);

      });
    }
  }

  openFileInput(fileInput: any) {
    fileInput.click();
    this.showAddPhotoOverlay = false;
  }

  removePhoto() {
    this.avatarImgElement.nativeElement.src = '';
    this.photo = '';
    this.photoUpdated.emit(this.photo);
  }
  @Output() toggleDetailScreen = new EventEmitter<string>();
}
