import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommonService } from 'src/app/shared/services/common.services';
import * as moment from 'moment';
import { MyReviewComponent } from 'src/app/views/private/my-review/my-review.component';
import { AppConstant } from 'src/app/shared/constants';
// This declaration allows TypeScript to recognize the '$' symbol as a reference to jQuery.
declare var $: any;

@Component({
  selector: 'app-my-review-activities-form',
  templateUrl: './my-review-activities-form.component.html',
  styleUrls: ['./my-review-activities-form.component.css'],
})
export class MyReviewActivitiesFormComponent implements OnInit {
  lastAction: any;
  isToggle: boolean = false;
  isOverall: boolean = false;
  startDate: string;
  endDate: string;
  domainName: string;
  searchString: string;
  selectedRating: string;
  selectedReplied: string;
  isAllSelected: boolean;
  selectedProfile: any;
  shortName: string;
  isFilterActive: boolean;
  sentimentdata: any[];
  myReviewModel: any;
  privateFeedbackModel: any;
  @Input() getReviewsData: any[];
  @Input() myReviewProfileCardFooter: any;
  @Input() myReviewActivitesPermission: any;
  @Input() myReviewComponent!: MyReviewComponent;
  @Output() updateFilter = new EventEmitter<any>;
  @Output() updateprivateFeedbackFilter = new EventEmitter<any>;
  @ViewChild('dateRangeFilter') dateRangeFilterRef!: ElementRef;
  @Input() isPrivateFeedbackData: boolean;

  checkedState: { [key: string]: boolean } = {}; // Object to store checked state
  minDate: any;
  maxDate: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<MyReviewActivitiesFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    private commonService: CommonService
  ) {
    this.myReviewModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.myReviewModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.myReviewModel.page = 1;
    this.myReviewModel.pagesize = 20;
    this.privateFeedbackModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.privateFeedbackModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.privateFeedbackModel.page = 1;
    this.privateFeedbackModel.pagesize = 20;
    this.isFilterActive = false;
    this.isAllSelected = false;
    this.selectedRating = '';
    this.selectedReplied = '';
    this.domainName = '';
    this.sentimentdata = [
      { label: 'Positive', checked: false },
      { label: 'Neutral', checked: false },
      { label: 'Negative', checked: false },
      { label: 'Mixed', checked: false },
    ];
  }

  /**
   *
   * @param event
   * @param index Index number
   * @param item item can be of sentimentData or ReviewsData type so, used any
   */
  onChange(index: number, item: any | any): void {
    const key = (item as any).SiteName || '';

    if (this.sentimentdata.includes(item as any)) {
      // Update sentimentData
      this.sentimentdata = this.sentimentdata.map((data) => {
        if (data === item) { return { ...data, checked: !data.checked }; }
        return data;
      });
    } else if (this.getReviewsData.includes(item as any)) {
      // Update getReviewsData
      this.getReviewsData = this.getReviewsData.map((data) => {
        if (data === item) { return { ...data, checked: !item.checked }; }
        return data;
      });
      // Update checkedState for ReviewSites
      this.checkedState = { ...this.checkedState, [key]: !this.checkedState[key] };
    }

    this.lastAction = 'index: ' + index + ', label: ' + key + ', checked: ' + this.checkedState[key];

    this.isFilterActive = true;
  }

  ngOnInit() {
    this.isToggle = this.myReviewActivitesPermission;
    this.selectedRating = '1';
    this.selectedReplied = 'All';
    if (this.data.isOpenBottomSheet && (this.isPrivateFeedbackData || this.data.isPrivateFeedbackData)) {
      this.isOverall = true;
      this.myReviewActivitesPermission = this.data.myReviewActivitesPermission;
    }else if (this.data.isOpenBottomSheet) {
      this.isOverall = true;
      this.isToggle = true;
      this.getReviewsData = this.data.getReviewsData;
      this.myReviewActivitesPermission = this.data.myReviewActivitesPermission;
    }
    this.commonService.$updateProfile.subscribe((value: any) => {
      if (value) {
        this.selectedProfile = value;
        this.shortName = this.selectedProfile.ShortName;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.data.isOpenBottomSheet) {
      // Wait for the MatBottomSheet to be fully rendered before initializing daterangepicker
      this.bottomSheetRef.afterOpened().subscribe(() => {
        this.openDateRangePicker();
      });
    }
    else {
      this.openDateRangePicker();
    }
  }

  /**
   * Function: Opens dateRangePicker
   */
  openDateRangePicker(): void {
    const el = this.dateRangeFilterRef.nativeElement;
    const start = moment().subtract(13, 'days');
    const end = moment();

    $(el).daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 14 Days': [moment().subtract(13, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'All': [null, null]
      }
    }, this.updateDateRangeText);

    this.updateDateRangeText(start, end);

    //Used any for picker as it has different type values.
    $(el).on('apply.daterangepicker', (event: Event, picker: any) => {
      if (picker.chosenLabel === 'All') {
        this.startDate = null;
        this.endDate = null;
        $('#dateRangeFilter span').html('All');
        $('#dateRangeFilter').addClass('all-text');
      } else {
        this.startDate = this.getMomentFormattedDate(picker.startDate);
        this.endDate = this.getMomentFormattedDate(picker.endDate);
        $('#dateRangeFilter span').html(this.startDate + ' - ' + this.endDate);
        $('#dateRangeFilter').removeClass('all-text');
      }
    });

    $('#dateRangeFilter').on('show.daterangepicker', () => {
      $('.app-sidenav-content').css('overflow', 'hidden'); // Disable scrolling when dropdown is opened
    });

    $('#dateRangeFilter').on('hide.daterangepicker', () => {
      $('.app-sidenav-content').css('overflow', 'auto'); // Enable scrolling when dropdown is closed
    });
  }

  /**
     * Function: Used as a callback for the date range picker to update the displayed date range whenever the selected range changes.
     * @param start The start date of the selected date range.
     * @param end The end date of the selected date range.
     */
  updateDateRangeText(start: moment.Moment | null, end: moment.Moment | null): void {
    if (start === null && end === null) {
      $('#dateRangeFilter span').html('All');
    } else {
      $('#dateRangeFilter span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
  }


  /**
    * Function: Converts the moment object into string format.
    * @param moment object is passed for string conversion
    * @returns date in string format
    */
  getMomentFormattedDate(date: moment.Moment): string {
    return date.format('MMMM D, YYYY');;
  }

  /**
   * Function: Used to open external URL through application
   */
  openExternalUrl(): void {
    this.domainName = this.extractMainDomain(window.location.href);
    const url = this.domainName + '/feedback/' + this.shortName;
    window.open(url, '_blank');
  }

  /**
   * Function: Extracts domain name from url
   * @param url URL
   * @returns Domain name
   */
  extractMainDomain(url: string): string {
    const parsedUrl = new URL(url);
    let domain = parsedUrl.protocol + '//' + parsedUrl.hostname;
    if (parsedUrl.hostname === 'localhost') {
      domain += `:${parsedUrl.port}`;
    }
    return domain;
  }

  /**
   * Function: Dismiss bottom sheet
   */
  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss()
  }

  /**
   * Function: used for getting data through search result
   */
  searchReviews(): void {
    if (this.isPrivateFeedbackData || this.data.isPrivateFeedbackData) {
      // Define a mapping of properties and their corresponding values
      const propertyMapping = [
        { property: 'Name', value: this.searchString },
        { property: 'startdate', value: this.startDate },
        { property: 'enddate', value: this.endDate },
        { property: 'rating', value: this.selectedRating },
        { property: 'isAnswer', value: this.selectedReplied },
      ];

      // Filter out properties with null, undefined, or empty values
      const filteredProperties = propertyMapping.filter(item => item.value !== null && item.value !== undefined && item.value !== '');

      // Assign filtered properties to myReviewModel
      filteredProperties.forEach(item => {
        this.privateFeedbackModel[item.property] = item.value;
      });

      if (this.privateFeedbackModel.Name || this.privateFeedbackModel.startdate || this.privateFeedbackModel.enddate || this.privateFeedbackModel.isAnswer || this.privateFeedbackModel.rating) {
        // Update the filters and trigger the API call in MyReviewComponent
        if (this.data.isOpenBottomSheet) {
          this.data.updateprivateFeedbackFilters(this.privateFeedbackModel);
          this.bottomSheetRef.dismiss();
        } else {
          this.updateprivateFeedbackFilter.emit(this.privateFeedbackModel);
        }
        this.isFilterActive = true;
      }
    }
    else {
      // Get the checked sentiment labels
      const checkedSentiments = this.sentimentdata
        .filter(item => item.checked)
        .map(item => item.label)
        .join(',');

      // Filter checked review sites
      const checkedReviewSites = this.getReviewsData ? this.getReviewsData.filter(item => this.checkedState[item.SiteName]) : [];
      // Map review site names to an array
      const reviewSitesString = checkedReviewSites ? (checkedReviewSites.map(item => item.SiteName)).join(', ') : '';
      // Define a mapping of properties and their corresponding values
      const propertyMapping = [
        { property: 'Name', value: this.searchString },
        { property: 'startdate', value: this.startDate },
        { property: 'enddate', value: this.endDate },
        { property: 'rating', value: this.selectedRating },
        { property: 'isAnswer', value: this.selectedReplied },
        { property: 'sentiment', value: checkedSentiments },
        { property: 'source', value: reviewSitesString }
      ];

      // Filter out properties with null, undefined, or empty values
      const filteredProperties = propertyMapping.filter(item => item.value !== null && item.value !== undefined && item.value !== '');

      // Assign filtered properties to myReviewModel
      filteredProperties.forEach(item => {
        this.myReviewModel[item.property] = item.value;
      });

      // Check if the 'Filter Sentiments and Channels' checkbox is checked or not
      if (!checkedSentiments) {
        delete this.myReviewModel.sentiment;
      }
      if (reviewSitesString == "") {
        delete this.myReviewModel.source;
      }
      if(this.searchString === ""){
        delete this.myReviewModel.Name;
      }

      if (this.myReviewModel.Name || this.myReviewModel.startdate || this.myReviewModel.enddate || this.myReviewModel.isAnswer || this.myReviewModel.rating || this.myReviewModel.sentiment || this.myReviewModel.source) {
        // Update the filters and trigger the API call in MyReviewComponent
        if (this.data.isOpenBottomSheet) {
          this.data.updateFilters(this.myReviewModel);
          this.bottomSheetRef.dismiss();
        } else {
          this.updateFilter.emit(this.myReviewModel);
        }
        this.isFilterActive = true;
      }
    }
  }

  /**
   * Function: Clears search filter
   */
  clearSearchReviews(): void {
    this.searchString = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedRating = '1';
    this.selectedReplied = '';

    // Reset sentimentData and getReviewsData
    if(this.sentimentdata){
      this.sentimentdata.forEach(item => item.checked = false);
    }
    if(this.getReviewsData){
      this.getReviewsData.forEach(item => this.checkedState[item.SiteName] = false);
    }
    // Reset myReviewModel to default values
    this.myReviewModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.myReviewModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.myReviewModel.page = 1;
    this.myReviewModel.pagesize = 20;

    // Reset privateFeedbackModel to default values
    this.privateFeedbackModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.privateFeedbackModel.ProfileId = this.commonService.GetLocalStorage('profileId');
    this.privateFeedbackModel.page = 1;
    this.privateFeedbackModel.pagesize = 20;

    // Trigger the API call in parent Component with default filters
    if (this.data.isOpenBottomSheet) {
      if(this.isPrivateFeedbackData || this.data.isPrivateFeedbackData) {
        this.data.updateprivateFeedbackFilter(this.privateFeedbackModel);
      }
      else {
        this.data.updateFilters(this.myReviewModel);
      }
      this.bottomSheetRef.dismiss();
    } else {
      if(this.isPrivateFeedbackData || this.data.isPrivateFeedbackData) {
        this.updateprivateFeedbackFilter.emit(this.privateFeedbackModel);
      }
      else {
        this.updateFilter.emit(this.myReviewModel);
      }
    }
  }

}
