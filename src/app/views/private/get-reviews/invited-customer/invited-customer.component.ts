import { Component, ElementRef, ErrorHandler, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { PagerService } from 'src/app/shared/services/pager.service';

export interface PeriodicElement {
  name: string;
  email: string;
  totalSent: number;
  lastSentDate: string;
  action: {
    subtract: boolean;
    message: boolean;
    tick: boolean;
    cross: boolean;
    info: boolean;
  };
}

interface HistoryData {
  icon: string;
  title: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-invited-customer',
  templateUrl: './invited-customer.component.html',
  styleUrls: ['./invited-customer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InvitedCustomerComponent {
  @ViewChild('searchId', { static: false }) searchRef: ElementRef;
  @ViewChild('activeSearchId', { static: false }) activeSearchRef: ElementRef;
  @ViewChild('drawer') drawer: MatDrawer;
  key: string;
  profileId: string;
  customerInvitation: any[];
  activeCustomerInvitation: any[];
  selectedValue: string;
  hasInQueue: boolean;
  inQueueSize: string;
  page: number;
  activePage: number;
  updateInQueuemodel: any;
  pagesize: number;
  activePagesize: number;
  cross: boolean;
  tick: boolean;
  totalRecord: number;
  activeTotalRecord: number;
  customerActivity: any[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subscription: Subscription;

  constructor(private pagerService: PagerService, private commonService: CommonService, private privateService: PrivateServices, private dialog: MatDialog, private errorHandler: ErrorHandlerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.updateInQueuemodel.key = this.key;
    this.updateInQueuemodel.profileId = this.profileId;
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.subscription = new Subscription();
    this.searchQuery = '';
    this.page = 1;
    this.activePage = 1;
    this.pagesize = 20;
    this.activePagesize = 20;
    this.cross = true;
    this.pager = {
      currentPage: 1,
      totalPages: 1, // Default value
      pageSize: this.pagesize,
      totalRecords: 0 // Default value, will be updated after API call
    };

    this.activePager = {
      currentPage: 1,
      totalPages: 1, // Default value
      pageSize: this.activePagesize,
      totalRecords: 0 // Default value, will be updated after API call
    };
  }
  breakPoint: number = 6;
  heightManage: any;
  openedTab: number = 0;
  showFiller = false;
  pager: any = {};
  // Used any because the return type of getPager method in pagerService is not mentioned.
  activePager: any = {};
  pagedItems: any;
  // Used any because of dependency of pagedItemsActive in other codes. It will be removed in upcoming pull requests.
  pagedItemsActive: any;
  searchQuery: string;
  activeSearchQuery: string;
  selectedItem: string = 'Item 1';
  displayedColumnsInQueue: string[] = [
    'name',
    'email',
    'totalSent',
    'action',
  ];
  displayedColumns: string[] = [
    'name',
    'email',
    'SMS',
    'totalSent',
    'lastSentDate',
    'action',
  ];
  pages: number[] = [1, 2, 3, 4];
  dataSource: any[];
  dataSourceActive: any[];

  ngOnInit() {
    this.searchQuery = '';
    this.activeSearchQuery = '';
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

    this.subscription =  this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getInqueueInvitationList();
        this.getActiveInvitationList();
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchRef?.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.page = 1;
        this.getInqueueInvitationList();
      });

    fromEvent(this.activeSearchRef?.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.page = 1;
        this.getActiveInvitationList();
      });


  }

  /**
    * Function: Used to get inqueue customer list.
    */
  getInqueueInvitationList(): void {
   
  }

  /**
    * Function: Used to get active customer list.
    */
  getActiveInvitationList(): void {

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

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;
  }

  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(
      this.totalRecord,
      page,
      true,
      2
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    // Update the current page and fetch the data if necessary
    if (page !== this.page) {
      this.page = page;
      this.getInqueueInvitationList();
    }
  }

  setItemsSorting(data: any) {
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

    this.pagesize = data;
    this.page = 1;
    this.getInqueueInvitationList();
  }

  /**
   * Function: Sets page numbers for active customer list. 
   * @param page: page for customer list.
   */
  setPageActive(page: number): void {
    if (this.activePager) {
      if (page < 1 || page > this.activePager.totalPages) {
        return;
      }
    }

    this.activePager = this.pagerService.getPager(
      this.activeTotalRecord,
      page,
      true,
      2
    );

    this.pagedItemsActive = this.dataSourceActive.slice(
      this.activePager.startIndex,
      this.activePager.endIndex + 1
    );

    // Update the current page and fetch the data if necessary
    if (page !== this.activePage) {
      this.activePage = page;
      this.getActiveInvitationList();
    }
  }

  /**
   * Function: Sorts the page for active customer list.
   *  @param data: data for getting total length of customer list.
   */
  setItemsSortingActive(data: number): void {
    this.activePager = this.pagerService.getPager(
      this.dataSourceActive.length,
      1,
      true,
      data
    );

    this.pagedItemsActive = this.dataSourceActive.slice(
      this.activePager.startIndex,
      this.activePager.endIndex + 1
    );


    this.activePagesize = data;
    this.activePage = 1;
    this.getActiveInvitationList();
  }

  /**
   * Function: Deletes all customer for inqueue customer list. 
   */
  deleteAllCustomer(): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',

        data: {
          message: ' Are You Sure You Want to Delete?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
       
      }
    });
  }

  /**
   * Function: Deletes an active customer from active customer list. 
   */
  deleteActiveCustomer(customerId: number): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',

        data: {
          message: ' Are You Sure You Want to Delete?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
    
      }
    });
  }

  /**
   * Function: Update subscribe/unsubscribe for the customer in active customer list. 
   */
  updateSubscribeCustomer(id: number, isActive: boolean, isSubscribe: boolean): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: isSubscribe ? 'Are You Sure You Want to Unsubscribe?' : 'Want to Subscribe'
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
      
      }
    });
  }

  /**
   * Function: Update activate/deactivate for the customer in customer list. 
   */
  updateActivateCustomer(id: number, isActive: boolean, isSubscribe: boolean): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: isActive ? 'Are You Sure You Want to Deactivate?' : 'Want to Activate?'
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
      
      }
    });
  }

  /**
   * Function: Selects the inqueue size of inqueue customer list.
   * @param value: selected value from dropdown for inQueueSize.
   */
  selectInQueue(value: string): void {
    this.updateInQueuemodel.inQueueSize = value;
  
  }

  /**
    * Function: Opens the confirmation dialog for deleting a customer in inqueue customer list.
    */
  deleteInQueueCustomer(id: number, email: string): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
      {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',

        data: {
          message: ' Are You Sure You Want to Delete?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result) {
     
      }
    });
  }

  /**
   * Function: Api call to get invitation list.
   * @param email : customer email
   * @param firstName : customer firstName
   * @param lastName : customer lastName
   * @param customerId : customer customerId
   * @param phoneNumber : customer phoneNumber
   */
  getCustomerActivity(email: string, firstName: string, lastName: string, customerId: number, phoneNumber: string): void {
  
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
