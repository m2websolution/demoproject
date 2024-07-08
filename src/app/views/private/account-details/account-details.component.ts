import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { environment } from 'src/environments/environment.dev';
import { AppConstant } from 'src/app/shared/constants';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetails: any = [];
  accessToken: string;
  profileId: string;
  key: string
  authenticationWith: string;

  constructor(public http: HttpClient, private commonService: CommonService, private errorHandler: ErrorHandlerService,
    public router: Router, private privateServices: PrivateServices, private activatedRoute: ActivatedRoute) {
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      this.authenticationWith = params.params.AuthenticationWith;
      if (params.params.AuthenticationWith === "Facebook") {
        this.accessToken = "";
        this.accessToken = localStorage.getItem("FacebooksignInToken");
        this.accountDetailList("Facebook");
      } else {
        this.accessToken = "";
        this.accessToken = localStorage.getItem("GoogleSignInToken");
        this.accountDetailList("Google");
      }
    });
  }

  /**
 * Function: Retrieve account details
 */
  accountDetailList(authenticationWith: string): void {
    if (authenticationWith === "Facebook") {
      this.facebookAccountDetailList();
    } else {
      this.googleAccountDetailList();
    }
  }

  /**
 * Function: Retrieve account details from Facebook
 */
  facebookAccountDetailList(): void {
   
  }

  /**
 * Function: Retrieve account details from Google
 */
  googleAccountDetailList(): void {
    this.commonService.SpinnerObervable(true);
    const payload: any = {
      Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
      AccessToken: this.accessToken,
      ProfileId: this.profileId,
      RedirectUrl: window.location.origin
    }
  }

  /**
Function: Connect to Facebook account
@param accountDetail: Details of the Facebook or google account to connect
*/
  connect(accountDetail: any): void {
    if (this.authenticationWith === "Facebook") {
      this.facebookConnect(accountDetail);
    } else {
      this.googleConnect(accountDetail);
    }
  }

  /**
 * Function: Connect to Facebook account
 * @param accountDetail Details of the Facebook account to connect
 */
  facebookConnect(accountDetail: any): void {
    this.commonService.SpinnerObervable(true);
    let payload: any = {
      PageId: accountDetail.id,
      AccessToken: this.accessToken,
      ProfileId: this.profileId,
      PageAccessToken: accountDetail.access_token,
      Key: localStorage.getItem("token")
    }
  }

  /**
 * Function: Connect to Google account
 * @param accountDetail Details of the Google account to connect
 */
  googleConnect(accountDetail: any): void {
    this.commonService.SpinnerObervable(true);
    let payload: any = {
      Key: localStorage.getItem("token"),
      AccountId: accountDetail.AccountId,
      LocationId: accountDetail.LocationId,
      ProfileId: this.profileId,
      LocationName: accountDetail.LocationName,
      WriteURL: accountDetail.WriteURL,
      HasOnboarding: JSON.parse(this.commonService.GetLocalStorage('HasOnboarding')),
      accesstoken: this.accessToken
    }
  }

  /**
   * Function: Gets the connected platform
   */
  getConnectedplatform(): void {
  
  }
}
