import { Component, EventEmitter, Output } from '@angular/core';
import { PagerService } from 'src/app/shared/services/pager.service';
import { UpdateCardComponent } from './model/update-card/update-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CancelsubcriptionComponent } from './model/cancelsubcription/cancelsubcription.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { AppConstant } from 'src/app/shared/constants';
import Bonboarding from 'bonboarding';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billing-screen',
  templateUrl: './billing-screen.component.html',
  styleUrls: ['./billing-screen.component.css'],
})
export class BillingScreenComponent {
  displayedColumns: string[] = ['amount', 'status', 'date', 'action'];
  pagedItems: any;
  pager: any = {};
  key: string;
  billingDetails: any;
  planeInfo: any[] = []
  cardDetails: any;
  pagesize: number = 5;
  count: number = 0;
  profilesData: string;
  profileDetails: any = {};
  
  constructor(private pagerService: PagerService,
    private dialog: MatDialog,
    private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.pager = {
      currentPage: 1,
      totalPages: 1,
      pageSize: this.pagesize,
      totalRecords: 0
    };

    this.activatedRoute.queryParams.subscribe(params => {
      if (!params['Payment']) {
        this.getBillingDetails();
      }
    });
  }
  @Output() onSelectPlan = new EventEmitter<any>();
  
  onUpgradeYourPlan(data: any) {
    this.onSelectPlan.emit(data);
  }
  dataSource: any;

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

  onUpdateCard() {
    const ref: MatDialogRef<UpdateCardComponent> = this.dialog.open(
      UpdateCardComponent,
      {
        width: '840px',
        height: '90vh',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    ref.afterClosed().subscribe(result => {
      if (result.success) {
        this.getCardDetails()
      }
    });
  }

  onCancelSubcription() {
    const ref: MatDialogRef<CancelsubcriptionComponent> = this.dialog.open(
      CancelsubcriptionComponent,
      {
        width: '840px',
        height: '90vh',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if (result.success) {
        this.getBillingDetails();
      }
    });
  }

  ngOnInit() {
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    if (this.profilesData !== "" || this.profilesData) {
      this.profileDetails = JSON.parse(this.profilesData);
    }
  }

  /**
 * Function: getBillingDetails
 * Description: Retrieves the billing details from the server and handles the response.
 */
  getBillingDetails() {
  
  }

  /**
 * Function: downloadInvoice
 * Description: Opens the invoice PDF in a new browser tab.
 * @param element - The invoice element containing the action URL.
 */
  downloadInvoice(element: any) {
    const url = element.action;
    window.open(url, '_blank');
  }

  /**
  * Function: getCardDetails
  * Description: Retrieves card details from a service and handles the response.
  */
  getCardDetails() {
    this.commonService.SpinnerObervable(true);
    
  }

}
