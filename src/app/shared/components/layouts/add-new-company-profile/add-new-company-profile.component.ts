import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import intlTelInput from 'intl-tel-input';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import * as countriesAndTimezones from 'countries-and-timezones';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-company-profile',
  templateUrl: './add-new-company-profile.component.html',
  styleUrls: ['./add-new-company-profile.component.css']
})
export class AddNewCompanyProfileComponent {
  @ViewChild('avatarImg', { static: true }) avatarImgElement: ElementRef;
  @ViewChild('phoneNumberInput') phoneNumberInput: ElementRef;
  @Input() photo: any;
  @Output() photoUpdated = new EventEmitter<string>();
  showAddPhotoOverlay = false;
  companySettingsForm: FormGroup;
  getValidateResponse: any;
  isValidPhoneNumber: boolean;
  countryData: intlTelInput.Plugin;
  key: string;
  profileId: string;
  companySettings: any;
  world: any[] = [];
  countryList: { code: string; timezone: string }[];
  industries: any[];
  fileExtension: string = '';
  logoLink: string | undefined;
  timeZones: any[];
  getTotalProfileCount: any;
  closeButtonVisible: boolean = true;
  
  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private http: HttpClient, private dialogRef: MatDialogRef<AddNewCompanyProfileComponent>) {
    this.companySettingsForm = this.fb.group({
      Key: '',
      Company_Name: ['', [Validators.required]],
      Unique_Profile_Name: ['', [Validators.required]],
      Person_Name: ['', [Validators.required]],
      Email_Address: ['', [Validators.required, Validators.email]],
      Country: ['', [Validators.required]],
      Country_code: ['', [Validators.required]],
      TimeZone: ['', [Validators.required,]],
      Industry: ['', [Validators.required]],
      Phone_Number: ['', [Validators.required]],
      ImageExtension: '',
      Logo: '',
      EmailLimit: 0,
      SMSLimit: 0,
      CopyProfileId: '',
    });

    this.countryList = [];
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.companySettingsForm.get('Key').setValue(this.key);
    this.getTotalProfileCount = this.commonService.GetLocalStorage('getTotalProfileCount');
    this.profileId = this.commonService.GetLocalStorage('profileId');

  }

  ngOnInit() {
    this.world = window.intlTelInputGlobals.getCountryData().map((x) => ({ name: x.name, code: x.iso2.toUpperCase() }));
    this.companySettingsForm
      .get('Company_Name')
      .valueChanges.subscribe((value) => {
        const formattedValue = this.formatProfileName(value);
        // Update 'Unique_Profile_Name' with the same value
        this.companySettingsForm
          .get('Unique_Profile_Name')
          .setValue(formattedValue);
      });
    if (this.getTotalProfileCount == 0) {
      this.closeButtonVisible = false;
    }
    this.getIndustriesList();
    this.timeZone();
  }

  ngAfterViewInit() {
    if (this.phoneNumberInput.nativeElement) {
      this.countryData = intlTelInput(this.phoneNumberInput.nativeElement, {
        initialCountry: 'auto',
        geoIpLookup: (callback) => {
          fetch('https://ipapi.co/json')
            .then((res) => res.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback('us'));
        },
        utilsScript: 'node_modules/intl-tel-input/build/js/utils.js',
      });
    }
    this.phoneNumberInput.nativeElement.addEventListener(
      'countrychange',
      () => {
        const code = this.countryData.getSelectedCountryData().iso2;
        this.companySettingsForm
          .get('Country')
          .setValue(code.toLocaleUpperCase());
        this.companySettingsForm
          .get('Country_code')
          .setValue(this.countryData.getSelectedCountryData().dialCode);
      }
    );

    const code = this.countryData.getSelectedCountryData().iso2;
    this.companySettingsForm
      .get('Country_code')
      .setValue(this.countryData.getSelectedCountryData().dialCode);
  }

  /**
    * Function: Convert to lowercase, replace spaces with hyphens, and remove special characters.
    * @params value: company name
    * @return formatted comapany name
    */
  formatProfileName(value: string): string {
    return value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  /**
   * Function: Gets the industries list
   */
  getIndustriesList(): void {
   
  }

  /**
    * Function: Adds the image file
    * @param event: event to read image file
    */
  addPhoto(event: Event): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarImgElement.nativeElement.src = fileReader.result;
    };
    const newval = fileReader.readAsDataURL((event.target as HTMLInputElement).files[0]);
    this.photo = 'xxxx';
    this.photoUpdated.emit(this.photo);

    //converting image to base64 string
    const files: FileList = (event.target as HTMLInputElement).files;
    if (files.length > 0) {
      const selectedFile: File = files[0];
      this.fileExtension = this.getFileExtension(selectedFile.name);

      // Convert the selected file to a base64 string
      this.convertFileToBase64(selectedFile).then((logoLink: string) => {
        // Send the base64 string to the backend
        this.companySettingsForm.get('Logo').setValue(logoLink);
        this.commonService.SpinnerObervable(false);
      });
    }
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

  /**
   * Function: Opens the file input
   * @param fileInput: file input
   */
  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
    this.showAddPhotoOverlay = false;
  }

  /**
   * Function: Removes the image file.
   */
  removePhoto(): void {
    this.avatarImgElement.nativeElement.src = '';
    this.photo = '';
    this.companySettingsForm.get('Logo').setValue('');
    this.photoUpdated.emit(this.photo);
  }

  /**
   * Function: Check if the phone number is valid
   */
  onPhoneNumberChange(): void {
    this.isValidPhoneNumber = this.countryData.isValidNumber();
  }

  /**
   * Function: Validate username is available or not.
   */
  callValidateAPI(): void {
    const valuesofUser = {
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      ShortName: this.companySettingsForm.get('Unique_Profile_Name').value,
      ProfileId: this.commonService.GetLocalStorage('profileId'),
    };
  }

  /**
   * Function: Gets the country timezone details.
   * @return: country timezone as string 
   */
  getCurrentTimeZone(): string {
    let date = new Date();
    let str = date.toString()
    return str.substring(str.indexOf('(') + 1, str.indexOf(')'))
  }

  /**
   * Function: Sets the country timezone in profile based on location.
   */
  timeZone(): void {
    if (this.getCurrentTimeZone().length > 0) {
      this.companySettingsForm.get('TimeZone').setValue(this.getCurrentTimeZone());
      let tempTimeZone = this.companySettingsForm.get('TimeZone').value;
      if (this.companySettingsForm.get('TimeZone').value != '') {
        for (var i = 0; i < this.timeZones.length; i++) {
          if (this.timeZones[i].id.toLocaleLowerCase() == tempTimeZone.toLocaleLowerCase()) {
            this.companySettingsForm.get('TimeZone').setValue(this.timeZones[i].id);
            break;
          } else {
            this.companySettingsForm.get('TimeZone').setValue('');
          }
        }
      }
    }
    else {
      this.companySettingsForm.get('TimeZone').setValue('GMT Standard Time');
    }
  }

  /**
   * Function: Creates the company
   */
  submit(): void {
  
  }
}
