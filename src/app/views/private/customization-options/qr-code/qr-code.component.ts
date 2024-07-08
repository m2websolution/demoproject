import { Component, Input, ViewChild } from '@angular/core';
import { PagerService } from 'src/app/shared/services/pager.service';
import { EmployeeQrCodeComponent } from '../modals/employee-qr-code/employee-qr-code.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from 'src/app/shared/services/common.services';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { AppConstant } from 'src/app/shared/constants';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'],
})
export class QrCodeComponent {
  displayedColumns: string[] = ['srno', 'date', 'errorlog', 'action'];
  pages: number[] = [1, 2, 3, 4, 5];
  breakPoint: number = 6;
  pager: any = {};
  pagedItems: any;
  reviewScreen: any;
  key: string;
  profileId: string;
  dataSource: any[];
  pagesize: number;
  page: number;
  totalRecord: number;
  myAngularxQrCode: string;
  qrCodeDownloadLink: SafeUrl;
  qrCodeDownloadLinks:SafeUrl[];
  domainName: string;
  shortName: string;
  subscription: Subscription;
  permissionsString: string;
  permissions: any = {};
  qrCodeVisible: boolean = true;
  userType: string;
  @ViewChild(QRCodeComponent) qrCode: QRCodeComponent;

  constructor(private pagerService: PagerService, private dialog: MatDialog, public router: Router, private privateService: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private sanitizer: DomSanitizer) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.pagesize = 20;
    this.page = 1;
    this.totalRecord = 0;
    this.domainName = '';
    this.qrCodeDownloadLinks = [];
    this.subscription = new Subscription();
    this.qrCodeDownloadLink = this.sanitizer.bypassSecurityTrustUrl('');
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.userType = this.commonService.GetLocalStorage('userType');
  }

  /**
  * Function: To get the domain.
  * @param url : current url
  * @returns domain
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
  * Function: To assign download qr code download link.
  * @param url : current url
  */
  onChangeURL(url: SafeUrl): void {
    this.qrCodeDownloadLink = url;
  }

  /**
  * Function: To assign download qr code download link.
  * @param url : current url
  * @param index : object index
  */
  onChangeURLEmployee(url: SafeUrl, index: number): void {
    this.qrCodeDownloadLinks[index] = url;
  }

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId) {
        this.getEmployeeList();
      }
    });
    
    this.commonService.$updateProfile.subscribe((value: any) => {
      if (value) {
        this.shortName = value.ShortName;
        this.domainName = `${this.extractMainDomain(window.location.href)}/feedback/${this.shortName}?utm_source=qr`;
      }
    });
    
    if (!this.permissions.HasQRCode && this.userType === 'Business User' || this.userType === 'Agency User') {
      this.qrCodeVisible = false;
    }
  }

  /**
  * Function: Show the upgrade plan popup.
  */
  openPermissionDialog(): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(ConfirmationModelComponent, {
      width: '50%',
      maxWidth: '480px',
      height: '50%',
      panelClass: 'custom-container',
      data: {
        message: 'upgrade',
      },
      backdropClass: 'confirmDialogComponent',
      hasBackdrop: true,
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(
          ['/admin'],
          { queryParams: { redirectPath: 'upgrade' } }
        );
      } else {
        this.commonService.SpinnerObervable(false);
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

  /**
  * Function: Redirects to selected platform review page.
  * @param data: employee list length.
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

    this.pagesize = data;
    this.page = 1;
    this.getEmployeeList();
  }

  /**
    * Function: Redirects to selected platform review page.
    * @param data: employee list length.
    */
  onEmploayQrCode(): void {
    const ref: MatDialogRef<EmployeeQrCodeComponent> = this.dialog.open(
      EmployeeQrCodeComponent,
      {
        width: 'auto',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployeeList();
      }
    });
  }

  /**
   * Function: Redirects to selected platform review page.
   * @param employee: employee details.
   */
  editEmployee(employee: any): void {
    const ref: MatDialogRef<EmployeeQrCodeComponent> = this.dialog.open(
      EmployeeQrCodeComponent,
      {
        width: '840px',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          employee: employee,
          mode: 'edit',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployeeList();
      }
    });
  }

  /**
 * Function: To delete an employee.
 * @param id: employee id.
 */
  deleteEmployee(id: number): void {
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
   * Function: To get employee list.
   */
  getEmployeeList(): void {
  
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @Input() rowData: any;
  @Input() columnData: any;
}
