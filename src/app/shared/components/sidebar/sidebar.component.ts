import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from '../../services/common.services';
import { AppConstant } from '../../constants';
import { MatSelectChange } from '@angular/material/select';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  @Input() sidenav?: MatSidenav;
  @Input() isMobileView?: boolean;
  @Input() screenView?: 'sm' | 'md' | 'lg';
  breakpoint: any;
  activeRoute: {
    route: string | null;
    subRoute: string | null;
  } = {
      route: null,
      subRoute: null,
    };
  manuSubIndex: any;
  key: string;
  activatedLink: string = 'Dashboard';
  profileList: any[];
  selectedCompany: string;
  emailSmsLimit: any;
  permissionsString: string;
  permissions: any = {};
  reportVisible: boolean;
  userType: string;
  premiumPlanVisible: Boolean = true;
  profile: any;
  planName: string;
  profilesData: string;
  profileDetails: any = {};
  url: any;
  
  private readonly secretKey = 'b14ca5898a4e4133bbce2ea2315a1916'; 

  get currentRoute() {
    return { parent: this.activeRoute.route, child: this.activeRoute.subRoute };
  }

  constructor(public router: Router, private privateService: PrivateServices,  private dialog: MatDialog, private commonService: CommonService, private errorHandler: ErrorHandlerService) {
    this.userType = this.commonService.GetLocalStorage('userType');
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    if (this.profilesData !== "" || this.profilesData) {
      this.profileDetails = JSON.parse(this.profilesData);
    }
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    if (this.permissionsString !== "" || this.permissionsString) {
      this.permissions = JSON.parse(this.permissionsString);
    }
    this.activeRoute.route = router.url.replace('/layout/', '');
  }

  ngOnInit() {
    this.planName = this.profileDetails.Plan;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.setActiveRoute();
    this.commonService.$profileValueSubject.subscribe(value => {
      this.profileList = value;
      if (this.profileList && this.profileList.length > 0) {
        this.selectedCompany = this.profileList[0].CompanyName;
      }
    });

    // Check users and hide the screen based on permissions
    if (this.userType === 'Sub User' && !this.permissions.HasReport) {
      this.menuList = this.menuList.filter(tab => tab.name !== 'Reports'
      );
    } else if (this.userType === 'Sub User' && !this.permissions.HasAPI) {
      this.menuList = this.menuList.filter(tab => tab.name !== 'Integrations'
      );
    } else if (this.userType === 'Sub User' && !this.permissions.HasSocialSharing &&
      !this.permissions.HasWebsiteWidget && !this.permissions.HasEmailWidget) {
      this.menuList = this.menuList.filter(tab => tab.name !== 'Widgets'
      );
    } else if (this.userType === 'Sub User' && !this.permissions.HasOptin) {
      this.menuList = this.menuList.filter(tab => tab.name !== 'Opt In Page'
      );
    } else if (this.userType === 'Sub User') {
      this.premiumPlanVisible = false
      this.menuList = this.menuList.filter(tab => tab.name !== 'Logout'
      );
    }
  }


  menuList: Array<any> = [
    {
      name: 'Dashboard',
      route: 'dashboard',
      icon: 'home',
      activeIcon: 'home_selected',
    },
    {
      name: 'Review Platforms',
      route: 'review-platforms',
      icon: 'review_platforms',
      activeIcon: 'review_platforms_selected',
    },
    {
      name: 'My Reviews',
      route: 'my-review',
      icon: 'my_reviews',
      activeIcon: 'my_reviews_selected',
    },
    {
      name: 'Private Feedback',
      route: 'private-feedback',
      icon: 'private_feedback',
      activeIcon: 'private_feedback_selected',
    },
    {
      name: 'Get Reviews',
      route: 'get-review',
      subMenu: [
        {
          name: 'Invite Customer',
          route: 'get-review/invite-customer',
        },
        {
          name: 'Bulk Invite',
          route: 'get-review/bulk-invite',
        },
        {
          name: 'Invited Cutomers',
          route: 'get-review/invited-customers',
        },
        {
          name: 'Email Settings',
          route: 'get-review/email-settings',
        },
        {
          name: 'Template Settings',
          route: 'get-review/template-settings',
        },
      ],
      icon: 'get_review',
      activeIcon: 'get_review_selected',
    },
    {
      name: 'Widgets',
      route: 'widgets',
      subMenu: [
        {
          name: 'Website Widgets',
          route: 'widgets/website-widgets',
        },
        {
          name: 'Social Sharing',
          route: 'widgets/social-sharing',
        },
        {
          name: 'Email Widgets',
          route: 'widgets/email-widgets',
        },
      ],
      icon: 'widgets',
      activeIcon: 'widgets_selected',
    },
    {
      name: 'Customization Options',
      route: 'customization-options',
      subMenu: [
        {
          name: 'Review Page',
          route: 'customization-options/review-page',
        },
        {
          name: 'Opt In Page',
          route: 'customization-options/opt-in-page',
        },
        {
          name: 'QR Code',
          route: 'customization-options/qr-code',
        },
        // {
        //   name: 'Review Screen',
        //   route: 'customization-options/review-screen-setting-main',
        // },
      ],
      icon: 'customization_options',
      activeIcon: 'customization_options_selected',
    },
    {
      name: 'Notification',
      route: 'notification',
      icon: 'notification',
      activeIcon: 'notification_selected',
    },
    {
      name: 'Reports',
      route: 'reports',
      subMenu: [
        {
          name: 'My Report',
          route: 'reports/my-report',
        },
        {
          name: 'Performance Report',
          route: 'reports/performance-report',
        },
        {
          name: 'QR Report',
          route: 'reports/qr-report',
        },
      ],
      icon: 'reports',
      activeIcon: 'reports_selected',
    },
    {
      name: 'Company Setting',
      route: 'company-setting',
      icon: 'company_setting',
      activeIcon: 'company_setting_selected',
    },
    {
      name: 'Integrations',
      route: 'integrations',
      icon: 'integrations',
      activeIcon: 'integrations_selected',
    },
    // {
    //   name: 'General Setting',
    //   route: 'general-setting',
    //   subMenu: [
    //     {
    //       name: 'Setup Domain',
    //       route: 'general-setting/setup-domain',
    //     },
    //     {
    //       name: 'Billing',
    //       route: 'general-setting/billing',
    //     },
    //     {
    //       name: 'Usage',
    //       route: 'general-setting/usage',
    //     },
    //     {
    //       name: 'User',
    //       route: 'general-setting/user',
    //     },
    //     {
    //       name: 'Company Profiles',
    //       route: 'general-setting/company-profiles',
    //     },
    //     {
    //       name: 'My Account',
    //       route: 'general-setting/my-account',
    //     },
    //   ],
    //   icon: 'general_setting',
    //   activeIcon: 'general_setting_selected',
    // },
    {
      name: 'Help Documentation',
      icon: 'help_documentation',
      activeIcon: 'help_documentation_selected',
    },
    {
      name: 'Logout',
      route: 'logout',
      icon: 'integrations',
      activeIcon: 'integrations_selected',
    },
  ];


  /**
   * Function: sets active route of application
   */
  setActiveRoute(): void {
    this.menuList.map((item) => {
      if (item.route === this.router.url.replace('/layout/', '')) {
        this.activeRoute.route = item.route;
        return item;
      } else {
        const subRoute = item?.subMenu?.find(
          (subItem: { route: string; name: string }) =>
            subItem.route === this.router.url.replace('/layout/', '')
        );
        if (subRoute) {
          this.activeRoute.route = item.route;
          this.activeRoute.subRoute = subRoute.route;
          return subRoute;
        }
      }
    });
  }

  /**
   * Function: For side bar navigation.
   * @param: route, subroute used for navigation.
   * @param: isHeader used for responsive behaviour condition.
   */
  toggleActiveRoute(route: string, subRoute: string, isHeader?: boolean, name?: string): void {
    if (route === 'logout') {
      this.commonService.SpinnerObervable(true);
     
    } else {
      this.activeRoute.route = route;
      if (subRoute) {
        this.activeRoute.subRoute = subRoute;
      }
      if (window.innerWidth < 1280 && !isHeader) {
        this.sidenav?.toggle();
      }
      if (name === 'Help Documentation') {
        this.url = 'https://grabyourreviews.zendesk.com/hc/en-us';
        window.open(this.url, '_blank');
      }
    }
  }

  /**
    * Function: Logout from the account.
    */
  logout(): void {
    
  }

  /**
 * Function: Notify the shared service about the dropdown value change.
 * @param event for dropdown option change
 */
  onDropdownChange(event: MatSelectChange): void {
    const selectedValue = event.value;
    const selectedProfile = this.profileList.find(x => x.CompanyName === selectedValue);
    this.commonService.AddLocalStorage('profileId', selectedProfile.ProfileId);
    this.emailSmsLimit.EmailLimit = selectedProfile.EmailLimit;
    this.emailSmsLimit.SMSLimit = selectedProfile.EmailLimit;
    this.emailSmsLimit.UsedEmail = selectedProfile.UsedEmail;
    this.emailSmsLimit.UsedSMS = selectedProfile.UsedSMS;
    this.commonService.notifyDropdownValueChange(selectedProfile.ProfileId);
    this.commonService.updateSmsEmailValueChange(this.emailSmsLimit);
  }

  
  /**
  * Function: Redirect to billing page 
  */
  openPermissionDialog(): void {
    this.router.navigate(
      ['/admin'],
      { queryParams: { redirectPath: 'upgrade' } }
    );
  }
}
