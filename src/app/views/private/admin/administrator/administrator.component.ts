import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TabService } from 'src/app/shared/components/tabs/tab.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { PaymentStatusModalComponent } from '../admin-components/billing-screen/model/payment-status-modal/payment-status-modal.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AdministratorComponent {
  permissionsString: string;
  permissions: any = {};
  userType : string;
  profilesData: string;
  profileDetails: any = {};

  constructor(public tabService: TabService, private commonService: CommonService, private route: ActivatedRoute, private router: Router,
    public dialog: MatDialog) {
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    if (this.profilesData !== "" || this.profilesData) {
      this.profileDetails = JSON.parse(this.profilesData);
    }
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.userType = this.commonService.GetLocalStorage('userType');
  }

  openedTab: number = 0;
  openedTab1: number = 0;
  selectedType: any = 0;

  ngOnInit() {
    if (this.userType === 'Sub User' && !this.permissions.HasCustomDomain) {
      this.adminTabs = this.adminTabs.filter(tab => tab.name === 'Profiles' || tab.name === 'My Account' ||
        tab.name === 'Change Password'
      );
    }

    if (this.profileDetails.Plan === 'Large' || this.userType === 'Agency User') {
    } else {
      this.adminTabs = this.adminTabs.filter(tab => tab.name !== 'Twilio Integration');
    }

    this.route.queryParams.subscribe(params => {
      const redirectPath = params['redirectPath'];
      if (redirectPath === 'upgrade') {
        this.openedTab = 5;
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1);
      }
    });
    
    this.route.queryParams.subscribe(params => {
      const paymentStatus = params['Payment'];
      if (paymentStatus === 'Success') {
        this.openedTab = 5;
        this.openDialog('success');
      } else if (paymentStatus === 'Cancel') {
        this.openedTab = 5;
        this.openDialog('cancel');
      }
    });

   /**
   *   Redirect on Add on Purchase screen
   */
    this.route.queryParams.subscribe(params => {
      const addOnPath = params['addOnPath'];
      if (addOnPath === 'addOnPurchase') {
        this.openedTab = 4;
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1);
      }
    });

      
    /**
  *   Redirect on Add on Twilio integration screen
  */
    this.route.queryParams.subscribe(params => {
      const twilioPath = params['twilioPath'];
      if (twilioPath === 'twiliointegration') {
        this.openedTab = 7;
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1);
      }
    });
  }
  

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;
  }
  tabChanged1(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab1 = tabChangeEvent.index;
  }

  adminTabs: any = [
    {
      name: 'Profiles',
      subTabs: [],
    },
    {
      name: 'White Label Options',
      subTabs: ['Branding', 'Domain Setup', 'Email Domain setup'],
    },
    {
      name: 'Profile Usage',
      subTabs: [],
    },
    {
      name: 'Company Profiles',
      subTabs: [],
    },
    {
      name: 'Usage/Addon Purchase',
      subTabs: [],
    },
    {
      name: 'Billing',
      subTabs: [],
    },
    {
      name: 'Users',
      subTabs: [],
    },
    {
      name: 'Twilio Integration',
      subTabs: [],
    },
    {
      name: 'My Account',
      subTabs: [],
    },
    {
      name: 'Change Password',
      subTabs: [],
    },
   
  ];

  onSelectPlan(data: any) {
    this.selectedType = data;
  }

  // @ViewChild('tabGroup')
  // tabGroup: any;

  // scrollTabs(event: any) {
  //   const children =
  //     this.tabGroup._tabHeader._elementRef.nativeElement.children;
  //   const back = children[0];
  //   const forward = children[2];
  //   if (event.deltaY > 0) {
  //     forward.click();
  //   } else {
  //     back.click();
  //   }
  // }

  /**
 * Opens a dialog to display payment status.
 * @param status The status of the payment ('success' or 'cancelled').
 */
  openDialog(status: string): void {
    const dialogRef = this.dialog.open(PaymentStatusModalComponent, {
      width: '400px',
      data: { title: status === 'success' ? 'Payment Successful' : 'Payment Cancelled', message: status === 'success' ? 'Your payment was successful.' : 'Your payment was cancelled.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
