import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { PagerService } from 'src/app/shared/services/pager.service';
import * as Papa from 'papaparse';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bulk-invite',
  templateUrl: './bulk-invite.component.html',
  styleUrls: ['./bulk-invite.component.css'],
})
export class BulkInviteComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  breakPoint: number = 6;
  heightManage: any;
  importedInvitationList: any;
  importCustomer: any;
  emailSmsLimit: any;
  // Used any as papaparse library converts csv file to object array and returns unknown array.
  csvRecords: any;
  csv: any;
  subscription: Subscription;

  // {
  //   first: string;
  //   second: string;
  //   third: string;
  // };

  constructor(private pagerService: PagerService, private privateService: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService) {
    this.importCustomer.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.importCustomer.profileId = this.commonService.GetLocalStorage('profileId');
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription = this.commonService.$emailValueSubject.subscribe((value: any) => {
      this.emailSmsLimit.EmailLimit = value.EmailLimit;
      this.emailSmsLimit.SMSLimit = value.SMSLimit;
      this.emailSmsLimit.UsedEmail = value.UsedEmail;
      this.emailSmsLimit.UsedSMS = value.UsedSMS;
    })
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
      second: this.breakPoint == 1 ? '480px' : '310px',
      third: this.breakPoint == 1 ? '100px' : '120px',
    };
    this.commonService.$dropdownValueSubject.subscribe(value => { 
      if (value) {
        this.importCustomer.profileId = this.commonService.GetLocalStorage('profileId');
        this.getImportInvitationList();
      }
    });
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
      second: this.breakPoint == 1 ? '480px' : '310px',
      third: this.breakPoint == 1 ? '100px' : '120px',
    };
  }

  /**
   * Function: Downloads the sample csv file for customer.
   */
  downloadCSV(): void {
    const headers = ['FirstName', 'LastName', 'Email', 'PhoneNumber', 'CountryCode'];
    const exampleRow = ['John', 'Doe', 'john.doe@example.com', '123456789', '1'];
    const csvString = Papa.unparse([headers, exampleRow]);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SampleCSV.csv';
    link.click();

  }

  /**
   * Function: Function to get imported customer list.
   */
  getImportInvitationList(): void {
    this.commonService.SpinnerObervable(true);
  
  }

  /**
   * Function: Api call to get dashboard data.
   * @param $event for uploading the csv file.
   */
  exportCustomer($event: Event): void {
    this.commonService.SpinnerObervable(true);
    const fileInput = $event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: false,
        complete: (result) => {
          const records = result.data as any[];
          this.csvRecords = records.filter((row) => (row.PhoneNumber && row.PhoneNumber.trim() !== '') || (row.Email && row.Email.trim() !== ''));
          this.importCustomer.data = this.csvRecords.map(obj => {
            return { ...obj, isSMS: obj.PhoneNumber !== '', isEmail: obj.Email !== '', isWhatsApp: obj.PhoneNumber !== '' };
          });
          this.importCustomer.isOptin = true;
          if (this.validateObjectKeys(this.importCustomer.data[0])) {
          
          }
          else {
            this.commonService.SpinnerObervable(false);
            this.commonService.SnackObervable('Invalid CSV format');
          }
        },
        error: (error) => {
          this.commonService.SpinnerObervable(false);
          this.commonService.SnackObervable(error.message);
        },
      });
    }
    this.clearFileInput();
  }

  /**
   * Function: Clearing the input value by setting it to empty string.
   */
  clearFileInput(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  /**
   * Function: Validates the CSV format for bulk invite.
   * @param obj : object of customer for checking keys.
   * @returns boolean
   */
  validateObjectKeys(obj: any): boolean {
    if (obj) {
      const requiredKeys = ['FirstName', 'LastName', 'Email', 'PhoneNumber', 'CountryCode'];
      for (const key of requiredKeys) {
        if (!(key in obj)) {
          return false; // Validation fails if any required key is missing
        }
      }
      return true; // Validation passes if all required keys are present
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
