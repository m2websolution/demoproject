
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { PagerService } from 'src/app/shared/services/pager.service';

import moment from 'moment';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

// This declaration allows TypeScript to recognize the '$' symbol as a reference to jQuery.
declare var $: any;


@Component({
  selector: 'app-profile-usage',
  templateUrl: './profile-usage.component.html',
  styleUrls: ['./profile-usage.component.css']
})
export class ProfileUsageComponent {

  @ViewChild('searchId', { static: false }) searchRef: ElementRef;
  displayedColumns: string[] = [
    'CompanyName',
    'UsedEmailCredit',
    'UsedSMSCredit',
    'NewReview',
    'AvgRating',
  ];
  // Used any because the return type of getPager method in pagerService is not mentioned.
  pagedItems: any;
  pager: any = {};
  profileUsageDetails: any[];
  key: string;
  dataSource: any[];
  totalRecord: number;
  pagesize: number;
  page: number;
  usedEmail: number;
  usedSMS: number;
  startDate: string;
  endDate: string;
  searchQuery: string;

  constructor(private dialog: MatDialog, private privateServices: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private pagerService: PagerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.totalRecord = 0;
    this.pagesize = 20;
    this.page = 1;
    this.searchQuery = '';
    this.endDate = this.getFormattedDate(new Date());
    const date = new Date();
    date.setDate(1);
    this.startDate = this.getFormattedDate(date);
    this.getProfileUsage();
  }

  /**
    * Function: Search based on name.
    */
  filterItemsByName(): void {
    if (this.searchQuery === '') {
      this.dataSource = this.profileUsageDetails;
      this.totalRecord = this.profileUsageDetails.length;
      const pageSize = typeof this.pagesize === 'number' ? this.pagesize : 5;
      // Recalculate pager based on the total records received
      this.pager = this.pagerService.getPager(
        this.totalRecord,
        this.page,
        true,
        pageSize
      );
      this.setPage(1);
    } else {
      this.dataSource = this.profileUsageDetails.filter(item => item.CompanyName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const pageSize = typeof this.pagesize === 'number' ? this.pagesize : 5;
      // Recalculate pager based on the total records received
      this.pager = this.pagerService.getPager(
        this.totalRecord,
        this.page,
        true,
        pageSize
      );
      this.setPage(1);
    }
  }

  /**
* Function: Converts the date into string format.
* @param date object is passed for string conversion
* @returns date in string format
*/
  getFormattedDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchRef?.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.page = 1;
        this.filterItemsByName();
      });
    const start = moment().startOf('month');
    const end = moment();

    /**
     * Function: Used as a callback for the date range picker to update the displayed date range whenever the selected range changes.
     * @param start The start date of the selected date range.
     * @param end The end date of the selected date range.
     */
    function updateDateRangeText(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 14 Days': [moment().subtract(13, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, updateDateRangeText);

    updateDateRangeText(start, end);

    $('#reportrange').on('apply.daterangepicker', (event, picker) => {
      this.startDate = this.getMomentFormattedDate(picker.startDate);
      this.endDate = this.getMomentFormattedDate(picker.endDate);
      this.getProfileUsage();
    });

    $('#reportrange').on('show.daterangepicker', () => {
      $('.app-sidenav-content').css('overflow', 'hidden'); // Disable scrolling when dropdown is opened
    });

    $('#reportrange').on('hide.daterangepicker', () => {
      $('.app-sidenav-content').css('overflow', 'auto'); // Enable scrolling when dropdown is closed
    });
  }

  /**
  * Function: Converts the moment object into string format.
  * @param moment object is passed for string conversion
  * @returns date in string format
  */
  getMomentFormattedDate(date: moment.Moment): string {
    return date.format('MM/DD/YYYY');;
  }

  /**
 * Function: Gets the details of the profile usage.
 */
  getProfileUsage(): void {
    
  }


  /**
   * Function: Sets the page.
   * @param page: page size
   */

  setPage(page: number): void {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(
      this.dataSource.length,
      page,
      true,
      this.pagesize
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  /**
    * Function: Sorts the page.
    * @param data : page size
    */
  setItemsSorting(data: number): void {
    this.pager = this.pagerService.getPager(
      this.dataSource.length,
      1,
      true,
      data
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnInit() {
    this.setPage(1);
  }
}

