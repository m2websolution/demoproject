import { Component, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css'],
})

export class IntegrationsComponent {
  @Output() itemName: string;
  isquickbooksConnected = true;
  isISNConnected = true;
  isnIntegrationName: string = '';
  integrationNames: string = '';
  integrationJobberNames: string = '';
  isjobberConnected = true;
  permissionsString: string;
  permissions: any = {};
  upgradeIntegration: boolean = true;
  userType: string;
  integrationsComman: string;
  accessKey: string;
  profileKey: string;
  quickIntegrationId: any;
  jobberIntegrationId: any;
  isnIntegrationId: any;

  constructor(public router: Router,private clipboard: Clipboard, private privateServices: PrivateServices, private commonService: CommonService, private dialog: MatDialog, private errorHandler: ErrorHandlerService) {
    this.integrationNames = localStorage.getItem('integrationNames') || '';
    this.integrationJobberNames = localStorage.getItem('integrationJobberNames') || '';
    this.isnIntegrationName = localStorage.getItem('isnIntegrationName') || '';

    //Added if integration is connected show check logo
    if (this.integrationNames == 'quickbooks') {
      this.isquickbooksConnected = false;
    }
    if (this.integrationJobberNames == 'Jobber') {
      this.isjobberConnected = false;
    }
    if (this.isnIntegrationName == 'isn') {
      this.isISNConnected = false;
    }

    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.userType = this.commonService.GetLocalStorage('userType');
  }

  ngOnInit() {
    this.getConnectedIntegration();
    this.profileKey = this.commonService.GetLocalStorage('profileId');
    if (this.userType === 'Business User' && !this.permissions.HasAPI) {
      this.upgradeIntegration = false;
    }
  }

  isDetail: any = true;

  toggleScreen(event: any) {
    this.isDetail = true;
  }

  // Navigate to the particular component.
  handleItemClick(itemName: string) {
    this.itemName = itemName;
    if (this.upgradeIntegration) {
      if (itemName === 'isn' || itemName === 'ziper' || itemName === 'jobber' || itemName === 'quickbooks') {
        this.isDetail = false;
        this.navigate(itemName);
      } else {
        this.isDetail = true;
      }
    } else {
      this.openPermissionDialog();
    }

    // Redirect new tab code intigrately and pabbly
    if (this.itemName === 'intigrately') {
      const url = 'https://grabyourreviews.zendesk.com/hc/en-us/articles/11235864893721--Review-Request-automation-through-Integrately-using-Grab-Your-Reviews-API';
      window.open(url, '_blank');
    } else if (this.itemName === 'pabbly') {
      const url = 'https://grabyourreviews.zendesk.com/hc/en-us/articles/11130867526297-Review-Request-automation-through-Pabbly-using-Grab-Your-Reviews-API';
      window.open(url, '_blank');
    }
  }


  navigate(itemName) {
    if (itemName === 'jobber') {
      this.router.navigateByUrl(`integrations/${itemName}`);
    } else if (itemName === 'quickbooks') {
      this.router.navigateByUrl(`integrations/${itemName}`);
    } else if (itemName === 'isn') {
      this.router.navigateByUrl(`integrations/detail`);
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



  /**
    * Function: To Get All Connected Integration.
    */
  getConnectedIntegration() {
   
  }

  /**
  * Function: To copy the selected item
  * @param accessKey: link to be copied
  */
  copyAccessKey(accessKey: string): void {
    this.clipboard.copy(accessKey);
    this.commonService.SnackObervable('Access Key copied');
  }

/**
* Function: To copy the selected item
* @param profileKey: link to be copied
*/
  copyProfileKey(profileKey: string): void {
    this.clipboard.copy(profileKey);
    this.commonService.SnackObervable('Profile Key copied');
  }

  data: any = [
    {
      name: 'ziper',
    },
    {
      name: 'intigrately',
    },
    {
      name: 'pabbly',
    },
    {
      name: 'isn',
    },
    {
      name: 'jobber',
    },
    {
      name: 'quickbooks',
    },

  ];
}
