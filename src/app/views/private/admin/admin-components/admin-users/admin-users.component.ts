import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PagerService } from 'src/app/shared/services/pager.service';
import { UserDeleteModalComponent } from './Modals/user-delete-modal/user-delete-modal.component';
import { UserEditModalComponent } from './Modals/user-edit-modal/user-edit-modal.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { AppConstant } from 'src/app/shared/constants';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { UserPasswordModalComponent } from './Modals/user-password-modal/user-password-modal.component';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminUsersComponent {
  @ViewChild('searchId', { static: false }) searchRef: ElementRef;
  pagedItems: any;
  pager: any = {};
  key: string;
  page: number;
  pagesize: number;
  totalRecord: number;
  dataSource: any[];
  userAccount: any[];
  searchQuery: string;


  displayedColumns: any = [
    'firstName',
    'lastName',
    'email',
    'access',
    'companyProfile',
    'lastLogin',
    'actions',
  ];

  constructor(private dialog: MatDialog, private privateService: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private pagerService: PagerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.totalRecord = 0;
    this.pagesize = 20;
    this.page = 1;
    this.searchQuery = '';
    this.pager = {
      currentPage: 1,
      totalPages: 1, // Default value
      pageSize: this.pagesize,
      totalRecords: 0 // Default value, will be updated after API call
    };
    this.getUserAccount();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchRef?.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.page = 1;
        this.filterItemsByName();
      });
  }

  /**
    * Function: Search based on First name.
    */
  filterItemsByName(): void {
    if (this.searchQuery === '') {
      this.dataSource = this.userAccount;
      this.totalRecord = this.userAccount.length;
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
      this.dataSource = this.userAccount.filter(item => item.FirstName.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
   * Function: Gets list of users.
   */
  getUserAccount(): void {
    this.commonService.SpinnerObervable(true);
  
  }

/**
   * Function: To extract keys from permission string.
   * @param dataString: .permission string
   * @returns string[]: array of keys.
   */
  extractKeys(dataString: string): string[] {
    // Remove the surrounding quotes and curly braces
    const cleanedString = dataString.slice(2, -1);
    // Split the string into key-value pairs
    const pairs = cleanedString.split(',');
    // Extract keys from pairs
    const keys = pairs.map(str => str.split(':')) // Split each string into key-value pair
      .filter(pair => pair[1] === 'true') // Filter pairs with value true
      .map(pair => pair[0].replace(/"/g, ' ')); // Extract keys without quotes
    return keys;
  }

  /**
   * Function: To delete a user.
   * @param id: user id.
   */
  deleteUser(id: string): void {
    const ref: MatDialogRef<UserDeleteModalComponent> = this.dialog.open(
      UserDeleteModalComponent,
      {
        width: '616px',
        maxWidth: '720px',
        height: '756px',
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
 * Function: To set password for a user.
 * @param id: user id
 */
  setUserPassword(id: string): void {
    const ref: MatDialogRef<UserPasswordModalComponent> = this.dialog.open(
      UserPasswordModalComponent,
      {
        width: '840px',
        maxWidth: '720px',
        height: '70%',
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
        this.commonService.SpinnerObervable(true);
        const passwordObj: any = {
          Key: this.key,
          Id: id,
          password: result.password
        }
        
      }
    });
  }

  setPage(page: number) {
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
  }


  OpenEditUserModal() {
    const ref: MatDialogRef<UserEditModalComponent> = this.dialog.open(
      UserEditModalComponent,
      {
        width: '840px',
        height: '772px !important',
        // height:" 702px",
        // maxHeight: '80vh',
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isEdit: false,
        },
      }
    );

    ref.componentInstance.closeModalEvent.subscribe(() => {
      // Call a method in the parent component
      this.getUserAccount();
    });
  }

  /**
   * Function: opens modal to edit the user.
   */
  editUserModal(index: number): void {
    const ref: MatDialogRef<UserEditModalComponent> = this.dialog.open(
      UserEditModalComponent,
      {
        width: '840px',
        height: '772px !important',
        panelClass: 'custom-container',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        data: {
          isEdit: true,
          dataSource: this.dataSource[index]
        },
      }
    );
    ref.componentInstance.closeModalEvent.subscribe(() => {
      // Call a method in the parent component
      this.getUserAccount();
    });
  }
}
