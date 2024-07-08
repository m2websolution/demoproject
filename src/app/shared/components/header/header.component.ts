import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddNewCompanyProfileComponent } from '../layouts/add-new-company-profile/add-new-company-profile.component';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { CommonService } from '../../services/common.services';
import { AppConstant } from '../../constants';
import { MatSelectChange } from '@angular/material/select';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() sidenav?: MatSidenav;
  @Input() isMobileView?: boolean;
  @Input() screenView?: 'sm' | 'md' | 'lg';
  @Input() showMenu: boolean = true;
  profiles: any[];
  key: string;
  profile: any;
  profileList: any;
  selectedCompany: string;
  emailSmsLimit: any;
  userType: string;
  companyVisible: boolean = true;
  showLockButton: boolean = true;
  permissionsString: string;
  permissions: any = {};
  getTotalProfileCount: any;
  planName: string;
  profilesData: string;
  profileDetails: any = {};
  upgradeMessage: string;
  limitMessage: string;

  constructor(private dialog: MatDialog, private privateServices: PrivateServices, public router: Router, private commonService: CommonService, private errorHandler: ErrorHandlerService) {
    this.userType = this.commonService.GetLocalStorage('userType');
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    if (this.profilesData !== "" || this.profilesData) {
      this.profileDetails = JSON.parse(this.profilesData);
    }
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    if (this.permissionsString !== "" || this.permissionsString) {
      this.permissions = JSON.parse(this.permissionsString);
    }
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    // this.getDetails();
    if(this.key){
      this.getProfileList();
    }
  }

  ngOnInit() {
    this.planName = this.profileDetails.Plan;
    this.commonService.$profileValueSubject.subscribe(value => {
      if (this.profiles.length > 0) {
        this.profiles = value;
        if (this.commonService.companyName && this.commonService.companyName !== '') {
          this.selectedCompany = this.commonService.companyName;
          const profileId = this.profiles.find(x => x.CompanyName === this.selectedCompany).ProfileId;
          this.commonService.AddLocalStorage('profileId', profileId);
        }
        else {
          this.selectedCompany = this.profiles[0].CompanyName;
        }
      }
    });

    this.userType = this.commonService.GetLocalStorage('userType');
    if (this.userType === 'Sub User') {
      this.showLockButton = false;
    }
  }



  // Moved this function out to the Sign.ts component
  /**
    * Function: Gets list of profile.
    */
  // getDetails() {
  //   this.privateServices.getdetails(this.key).subscribe({
  //     next: (res) => {
  //       if (res.result.status) {
  //         this.profile = res.data;
  //         this.commonService.profileName = this.profile.User_Name;
  //         this.commonService.AddLocalStorage('Permissions', JSON.stringify(this.profile.Permissions));
  //         this.commonService.updateCountryCode(this.profile.Account);
  //         this.commonService.AddLocalStorage('profileName', this.profile.User_Name);
  //         this.commonService.AddLocalStorage('profileDetails', JSON.stringify(this.profile));

  //         // Call Get all user types 
  //         this.commonService.getUserType().subscribe(userType => {
  //           this.userType = userType;
  //         });
  //         this.commonService.AddLocalStorage('userType', this.userType);
  //       } else {
  //         this.errorHandler.catchError(res);
  //       }
  //     },
  //     error: (error) => {
  //       this.errorHandler.catchError(error);
  //     }
  //   });
  // }

  
  /**
  * Function: Gets list of profile.
  */
  getProfileList() {
  
  }

  /**
   * Function: Notify the shared service about the dropdown value change.
   * @param event for dropdown option change
   */
  onDropdownChange(event: MatSelectChange): void {
    this.commonService.isDashboardCalled = false;
    const selectedValue = event.value;
    const selectedProfile = this.profiles.find(x => x.CompanyName === selectedValue);
    this.commonService.AddLocalStorage('profileId', selectedProfile.ProfileId);
    this.emailSmsLimit.EmailLimit = selectedProfile.EmailLimit;
    this.emailSmsLimit.SMSLimit = selectedProfile.EmailLimit;
    this.emailSmsLimit.UsedEmail = selectedProfile.UsedEmail;
    this.emailSmsLimit.UsedSMS = selectedProfile.UsedSMS;
    this.commonService.notifyDropdownValueChange(selectedProfile.ProfileId);
    this.commonService.updateSmsEmailValueChange(this.emailSmsLimit);
    this.commonService.updateProfileValue(selectedProfile);
  }

  onCompanyProfile() {
    const ref: MatDialogRef<AddNewCompanyProfileComponent> = this.dialog.open(
      AddNewCompanyProfileComponent,
      {
        width: '840px',
        height: '90vh',
        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
        disableClose: true // Prevent closing on outside click
      }
    );
  
    ref.afterClosed().subscribe(result => {  
        this.getProfileList();
    });
  }
  
  
  /**
  * Function: Show the upgrade plan popup.
  */
  onUpgradeProfile(buttonId: string): void {
    if (buttonId === 'upgradeMessage') {
          this.router.navigate(
            ['/admin'],
            { queryParams: { redirectPath: 'upgrade' } }
          );
    } else if (buttonId === 'limitMessage') {
      const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(ConfirmationModelComponent, {
        width: '50%',
        maxWidth: '480px',
        height: '50%',
        panelClass: 'custom-container',
        data: {
          message: 'limitEX',
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
  }

  /**
  * Function: Logout from the account.
  */
  logout(): void {
    this.commonService.SpinnerObervable(true);
    
  }
}
