import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.services';
import { AppConstant } from 'src/app/shared/constants';
import intlTelInput from 'intl-tel-input';
import { PrivateServices } from 'src/app/services/PrivateServices';
import * as countriesAndTimezones from 'countries-and-timezones';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { HttpClient } from '@angular/common/http';
import * as data from '../../../../assets/timezone.json';
import { Subscription, count } from 'rxjs';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css'],
})
export class CompanySettingsComponent {
  @ViewChild('avatarImg', { static: true }) avatarImgElement: any;
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
  subscription: Subscription;
  getActiveNumber: any[];
  fetchTwilioNumbers: boolean = false;
  profileCountry: string = "";
  activePhoneNumberList: string[] = new Array<string>();
  shouldShowSMSTwilioNumber: boolean = true;
  count: number = 0;

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private http: HttpClient) {
    this.companySettingsForm = this.fb.group({
      Key: '',
      Id: [0, [Validators.required, Validators.minLength(3)]],
      CompanyName: ['', [Validators.required, Validators.minLength(3)]],
      UniqueProfileName: ['', [Validators.required, Validators.minLength(3)]],
      PersonName: ['', [Validators.required, Validators.minLength(3)]],
      EmailAddress: ['', [Validators.required, Validators.email]],
      Country: ['', [Validators.required]],
      TimeZone: ['', [Validators.required, Validators.minLength(3)]],
      Industry: ['', [Validators.required, Validators.minLength(3)]],
      PhoneNumber: ['', [Validators.required]],
      LogoURL: '',
      FromPhoneNumber: ['', this.shouldShowSMSTwilioNumber ? Validators.required : null]
    });

    this.getValidateResponse.isUserNameValid = true;
    this.countryList = [];
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.world = window.intlTelInputGlobals.getCountryData().map((x) => ({ name: x.name, code: x.iso2.toUpperCase() }));
    this.companySettingsForm
      .get('CompanyName')
      .valueChanges.subscribe((value) => {
        const formattedValue = this.formatProfileName(value);
        // Update 'Unique_Profile_Name' with the same value
        this.companySettingsForm
          .get('UniqueProfileName')
          .setValue(formattedValue);
      });
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getIndustriesList();
        this.getProfileDetails();
      }
    });
    this.http.get<any[]>('/assets/timezone.json').subscribe(data => {
      this.timeZones = data;
    });

    this.profileCountry = localStorage.getItem("Country");
    if (this.profileCountry == "IN") {
      this.shouldShowSMSTwilioNumber = false;
    }
  }

  ngAfterViewInit() {
    if (this.phoneNumberInput.nativeElement) {
      this.countryData = intlTelInput(this.phoneNumberInput.nativeElement, {
        initialCountry: 'auto',
        utilsScript: 'node_modules/intl-tel-input/build/js/utils.js',
      });
      if (this.companySettings?.Country) {
        this.countryData.setCountry(this.companySettings?.Country.toLocaleLowerCase());
      }
    }
    this.phoneNumberInput.nativeElement.addEventListener(
      'countrychange',
      () => {
        const code = this.countryData.getSelectedCountryData().iso2;
        this.companySettingsForm
          .get('Country')
          .setValue(code.toLocaleUpperCase());
      }
    );
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
   * Function: Converts Country name to timzone format.
   * @param timezone: timezone
   * @param countryName: country name
   * @returns concatenated value of timezone and country name 
   */
  private formatTimezone(timezone: string, countryName: string): string {
    const offsetMinutes =
      countriesAndTimezones.getTimezone(timezone)?.utcOffset;
    if (offsetMinutes !== undefined) {
      const offsetHours = Math.floor(offsetMinutes / 60);
      const offsetMinutesRemainder = Math.abs(offsetMinutes % 60);
      const formattedOffset = `UTC${offsetHours >= 0 ? '+' : '-'}${Math.abs(
        offsetHours
      )}:${offsetMinutesRemainder}`;
      return `(${formattedOffset}) ${countryName}/${timezone.split('/')[1]}`;
    }
    return timezone;
  }

  /**
   * Function: Gets the industries list
   */
  getIndustriesList(): void {
   
  }

  /**
    * Function: Gets the company settings
    */
  getProfileDetails(): void {
   
  }

  addPhoto(event: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarImgElement.nativeElement.src = fileReader.result;
    };
    const newval = fileReader.readAsDataURL(event.target.files[0]);
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
        this.companySettingsForm.get('LogoURL')?.setValue(logoLink);
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

  openFileInput(fileInput: any) {
    fileInput.click();
    this.showAddPhotoOverlay = false;
  }

  removePhoto() {
    this.avatarImgElement.nativeElement.src = '';
    this.photo = '';
    this.photoUpdated.emit(this.photo);
  }

  /**
   * Function: Check if the phone number is valid
   */
  onPhoneNumberChange(): void {
    this.isValidPhoneNumber = this.countryData.isValidNumber();
  }

  /**
   * Function: Validate for unique profile name is available or not.
   */
  callValidateAPI(): void {
    const valuesofUser = {
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      ShortName: this.companySettingsForm.get('UniqueProfileName').value,
      ProfileId: this.commonService.GetLocalStorage('profileId'),
    };
    if (valuesofUser.ShortName !== '' && valuesofUser.ShortName !== undefined) {
    
    }
  }

  /**
   * Function: Get active phone number list related twilio integration
   */
  getActivePhoneNumberList(fetchTwilioNumbers: boolean): void {
    
  }

  /**
   * Function: Check validation for FromPhoneNumber field company settings
   */
  AddOrClearTwilioNumberValidation(): void {
    if (this.shouldShowSMSTwilioNumber) {
      for (const key in this.companySettingsForm.controls) {
        if (key == "FromPhoneNumber") {
          this.companySettingsForm.get(key).setValidators(Validators.required);
          this.companySettingsForm.get(key).updateValueAndValidity();
        }
      }
    }
    else {
      for (const key in this.companySettingsForm.controls) {
        if (key == "FromPhoneNumber") {
          this.companySettingsForm.get(key).clearValidators();
          this.companySettingsForm.get(key).updateValueAndValidity();
        }
      }
    }

  }

  /**
   * Function: Updates the company settings
   */
  submit(): void {
    
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
