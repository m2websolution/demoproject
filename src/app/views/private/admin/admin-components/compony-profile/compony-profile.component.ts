import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PagerService } from 'src/app/shared/services/pager.service';
import { SetLimitComponent } from './set-limit/set-limit.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';

@Component({
  selector: 'app-compony-profile',
  templateUrl: './compony-profile.component.html',
  styleUrls: ['./compony-profile.component.css'],
})
export class ComponyProfileComponent {
  displayedColumns: string[] = [
    'company_name',
    'shortname',
    'email',
    'creation_date',
    'email_limit',
    'sms_limit',
    'action',
  ];
  @ViewChild('searchId', { static: false }) searchRef: ElementRef;
  pagedItems: any;
  reviewScreen: any;
  pager: any = {};
  profileList: any[];
  key: string;
  dataSource: any[];
  totalRecord: number;
  pagesize: number;
  page: number;
  totalEmail: number;
  totalSMS: number;
  usedEmail: number;
  usedSMS: number;
  searchQuery: string;
  isEmail:boolean;
  isSMS:boolean;

  constructor(private dialog: MatDialog, private privateServices: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private pagerService: PagerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.totalRecord = 0;
    this.pagesize = 20;
    this.page = 1;
    this.getProfileList();
    this.totalEmail = 0;
    this.totalSMS = 0;
    this.usedEmail = 0;
    this.usedSMS = 0;
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
    * Function: Search based on company name.
    */
  filterItemsByName(): void {
    this.commonService.SpinnerObervable(true);
    if (this.searchQuery === '') {
      this.dataSource = this.profileList;
      this.totalRecord = this.profileList.length;
      const pageSize = typeof this.pagesize === 'number' ? this.pagesize : 5;
        // Recalculate pager based on the total records received
        this.pager = this.pagerService.getPager(
          this.totalRecord,
          this.page,
          true,
          pageSize
        );
        //this.setPage(1);
    } else {
      this.dataSource = this.profileList.filter(item => item.CompanyName.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
    this.commonService.SpinnerObervable(false);
  }

  /**
   * Function: Gets list of profile.
   */
  getProfileList(): void {
   
  }

   /**
   * Function: To delete a compony profile.
   * @param id: user id.
   */
   deleteCompanyProfile(profileId: string): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
      ConfirmationModelComponent,
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
  setItemsSorting(data: number) {
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

   /**
   * Function: To delete a compony profile.
   * @param id: profileId.
   */
  onSeltLimit(profileId: string, isEmail: boolean, isSMS: boolean): void {
    const ref: MatDialogRef<SetLimitComponent> = this.dialog.open(
      SetLimitComponent,
      {
        width: '840px',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          profileId: profileId,
          isEmail: this.isEmail,
          isSMS: this.isSMS
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.componentInstance.closeModalEvent.subscribe(() => {
      // Call a method in the parent component
      this.getProfileList();
    });
  }
  ngOnInit() {
    this.setPage(1);
  }
  @Input() rowData: any;
  @Input() columnData: any;
}
