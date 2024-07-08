import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConstant } from '../constants';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from './ErrorHandler.service';


@Injectable({
    providedIn: 'root'
})
export class CommonService {
    $DashboardRefresh: Subject<string> = new Subject<string>();
    $Spinner: Subject<boolean> = new BehaviorSubject<boolean>(false);
    $Snackbar: Subject<string> = new BehaviorSubject<string>("");
    $dropdownValueSubject: Subject<string> = new BehaviorSubject<string>("");
    $emailValueSubject: Subject<any>;
    $countryValueSubject: Subject<string> = new BehaviorSubject<string>(null);
    $profileValueSubject: Subject<any[]> = new BehaviorSubject<any[]>(null);
    profileName: string;
    emailSmsLimit: any;
    profiles: any[];
    profileList: any;
    selectedCompany: string;
    companyName: string;
    isProfileListAPICalled: boolean;
    isDashboardCalled: boolean;
    key: string;
    redirectedFromLandingPage: boolean;
    $connectedPlatformList: BehaviorSubject<any>;
    $updateProfile: BehaviorSubject<any>;
    constructor(private _HttpClient: HttpClient, private privateServices: PrivateServices) {
        this.profileName = '';
        this.key = this.GetLocalStorage(AppConstant.localStorage_Token);
        this.companyName = '';
        this.selectedCompany = '';
        this.isProfileListAPICalled = false;
        this.isDashboardCalled = false;

    }

    GetDomainName(): string {
        var url = window.location.href
        var arr = url.split("/");
        var result = arr[0] + "//" + arr[2];
        let currentDomainUrl = result.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
        if (!currentDomainUrl.includes('localhost') && !currentDomainUrl.includes('grabyourreviews') && !currentDomainUrl.includes('gyr-dashboard.netlify.app')) {
            currentDomainUrl = currentDomainUrl
        }
        else {
            currentDomainUrl = 'app.grabyourreviews.com'
        }
        return currentDomainUrl;
    }

    /**
     * Function: used for getting data of connectedPlatformList through subscriber
     * @returns list of connected platforms through subscriber
     */
    getConnectedPlatformListData(): Observable<any> {
        return this.$connectedPlatformList.asObservable();
    }

    /**
  * Function: Gets list of profile.
  */
    getProfileList() : void {
       
    }

    /**
     * Function: used to update list of connectedPlatform
     * @param data connected platform data to update list
     */
    updateConnectedPlatformListData(data: any): void {
        this.$connectedPlatformList.next(data);
    }

    AddLocalStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    GetLocalStorage(key: string): string {
        let value = localStorage.getItem(key);
        value = value == null || value == undefined ? "" : value;
        return value;
    }

    RefreshDashboard(profieId: string): void {
        this.$DashboardRefresh.next(profieId);
    }


    SpinnerObervable(value: boolean): void {
        this.$Spinner.next(value);
    }

    SnackObervable(value: string): void {
        this.$Snackbar.next(value);
    }


    GetAndSetIPAddress(): void {
        this._HttpClient.get("")
            .subscribe((data: any) => {
                if (data) {
                    this.AddLocalStorage(AppConstant.localStorage_IpAddress, data['ip']);
                }
            })
    }

    notifyDropdownValueChange(value: string): void {
        this.$dropdownValueSubject.next(value);
    }

    /**
     * Function: Update Email SMS value.
     * @param value : model for profile email and sms information
     */
    updateSmsEmailValueChange(value: any): void {
        this.$emailValueSubject.next(value);
    }

    /**
     * Function: Updates profile list.
     * @param value : model for profile list
     */
    updateProfile(value: any[]): void {
        this.$profileValueSubject.next(value);
    }

    /**
     * Function: Update country code
     * @param value : country code
     */
    updateCountryCode(value: string): void {
        this.$countryValueSubject.next(value);
    }

    httperrorHandle(error: HttpErrorResponse) {
        return throwError(() => new Error('something went'))

    }

    /**
     * Function: Update profile value.
     * @param value : model for profile
     */
    updateProfileValue(value: any): void {
        this.$updateProfile.next(value);
    }

   /**
    * Function: Get users based on permissions
    */
    getUserType(): Observable<string> {
        const profileDataString = this.GetLocalStorage('profileDetails');
        if (!profileDataString) {
            return of('Unknown User');
        }
        const profile = JSON.parse(profileDataString);
        const isAgency = profile.IsAgency;
        const isReseller = profile.IsReseller;

        if (isAgency && isReseller) {
            return of('Agency User');
        } else if (!isAgency && isReseller) {
            return of('Business User');
        } else if (!isAgency && !isReseller) {
            return of('Sub User');
        } else {
            return of('Unknown User');
        }
    }
}
