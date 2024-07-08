import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PagerService } from 'src/app/shared/services/pager.service';
import { AdditionalEmailCreditsComponent } from './additional-email-credits/additional-email-credits.component';
import { UpdateSmsComponent } from './update-sms/update-sms.component';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { FormBuilder } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';

@Component({
  selector: 'app-usage-addon-purchase',
  templateUrl: './usage-addon-purchase.component.html',
  styleUrls: ['./usage-addon-purchase.component.css'],
})
export class UsageAddonPurchaseComponent {
  displayedColumns: string[] = ['icon', 'used', 'recurring'];
  pagedItems: any;
  reviewScreen: any;
  pager: any = {};
  key: string;
  usageData: any;
  dataSource: any[];
  profilesData: any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private dialog: MatDialog, private pagerService: PagerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
  }

  /**
* Function: To get branding details.
*/
  getUsageData(): void {
   
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
      4
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
  ngOnInit() {
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    if (this.profilesData !== "" || this.profilesData) {
      this.profilesData = JSON.parse(this.profilesData);
    }
    this.getUsageData();
  }

  onAdditionalEmailCredits(data: any) {
    const ref: MatDialogRef<AdditionalEmailCreditsComponent> = this.dialog.open(
      AdditionalEmailCreditsComponent,
      {
        width: '640px',
        height: '887px',
        panelClass: 'custom-container',
        data: {
          message: data,
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    ref.afterClosed().subscribe(result => {
      if (result.success) {
        this.getUsageData()
      }
    });
  }


  onUpdateSMS() {
    const ref: MatDialogRef<UpdateSmsComponent> = this.dialog.open(
      UpdateSmsComponent,
      {
        width: '640px',
        height: '887px',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }
  @Input() rowData: any;
  @Input() columnData: any;

  /**
 * Function: Determines whether the "Add" button should be disabled based on the type and plan.
 * @param element - The element containing type and other data.
 * @returns {boolean} - True if the button should be disabled, otherwise false.
 */
  isActionDisabled(element): boolean {
    if (element.type === 'User') {
      return true;
    } else if (element.type === 'Company') {
      if (this.profilesData.Plan === "Large") {
        return false;
      } else if (this.profilesData.Plan === "Agency") {
        return false;
      }
      else {
        return true
      }
    } else {
      return false;
    }
  }

  onToggleChange(event: any, element: any): void {
    if (!event.checked) {
      this.deleteEmployee(element.type);
    } else {
      this.onAdditionalEmailCredits(element);
    }
  }

  /**
* Function: To delete an employee.
* @param type: employee id.
*/
  deleteEmployee(type: string): void {
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
}
