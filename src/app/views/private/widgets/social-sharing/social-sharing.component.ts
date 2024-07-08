import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Route, Router } from '@angular/router';
import { GoogleAuthService } from 'ng-gapi';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { ShareReviewCardComponent } from 'src/app/shared/components/my-review-card-model/share-review-card/share-review-card.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function loginFb(): any;
declare function getfbAccessToken(): any;
declare function intitFb(): any;

@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.component.html',
  styleUrls: ['./social-sharing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SocialSharingComponent implements OnInit {
  screenSize?: any;
  openedTab?: number;
  rating: any;
  votes: any;
  average: any;
  permissionsString: string;
  permissions: any = {};
  socialVisible: boolean = true;
  userType: string;
  access_token: string = '';
  googleCode: any;
  profileId: string = "";
  key: string = "";
  templateTags: string[] = [
    'firstname',
    'reviewsource',
    'rating',
    'reviewtext',
    'reviewtexturl',
    'reviewdate'
  ];

  excludeStarRatingsForFacebook: any = [
    { id: 1, selected: false, stars: 0 },
    { id: 2, selected: false, stars: 1 },
    { id: 3, selected: false, stars: 2 },
    { id: 4, selected: true, stars: 3 },
    { id: 5, selected: true, stars: 4 },
    { id: 6, selected: false, stars: 5 },
  ];
  startorageborder: any;
  selectedStartsec: any = 'star-ratting-section-backgroud';
  excludestarratingsData = [
    {
      id: 1,
      title: 'Facebook',
      img: 'assets/svg/logos/facebook_icon.svg',
      isActive: 0,
    },
    {
      id: 2,
      title: 'Google',
      img: 'assets/svg/logos/google_icon.svg',
      isActive: 0,
    },
    {
      id: 3,
      title: 'Airbnb',
      img: 'assets/images/Airbnb.svg',
      isActive: 0,
    },
    {
      id: 4,
      title: 'Landing Tree',
      img: 'assets/svg/logos/landing tree_icon.svg',
      isActive: 0,
    },
  ];
  socialSharingStatus: any;
  socialSharingDetails: any;
  accountDetails: any = [];
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  excludeReviewSitesForGoogle: any = [];
  excludeStarRatingsForGoogle: any = [
    { id: 1, selected: false, stars: 0 },
    { id: 2, selected: false, stars: 1 },
    { id: 3, selected: false, stars: 2 },
    { id: 4, selected: false, stars: 3 },
    { id: 5, selected: false, stars: 4 },
    { id: 6, selected: false, stars: 5 },
  ];
  googleForm: FormGroup;
  facebookAccountDetails: any = [];
  facebookForm: FormGroup;
  excludeReviewSitesForFacebook: any = [];



  constructor(private layoutService: LayoutService, private dialog: MatDialog, private commonService: CommonService, public router: Router,
    public gAuth: GoogleAuthService,
    private privateServices: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private clipboard: Clipboard,
    private fb: FormBuilder
  ) {
    this.screenSize = this.layoutService.screenSize;
    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.userType = this.commonService.GetLocalStorage('userType');
  }
  @Output() onSelectPlan = new EventEmitter<any>();

  ngOnInit() {
    if (!this.permissions?.HasSocialSharing && this.userType === 'Business User' || this.userType === 'Agency User') {
      this.socialVisible = false;
    }

    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    intitFb();
    this.GetSocialSharingStatus("Facebook");
    this.googleForm = this.fb.group({
      googleBusinessLocation: ['', Validators.required],
      postTemplate: ['', Validators.required],
      maxPostsPerDay: [''],
      excludeReviewsWithNoText: [false]
    });

    this.facebookForm = this.fb.group({
      facebookPage: ['', Validators.required],
      postTemplate: ['', Validators.required],
      maxPostsPerDay: [''],
      excludeReviewsWithNoText: [false]
    });
  }

  onResize(event: any) {
    this.screenSize = this.layoutService.screenSize;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openedTab = tabChangeEvent.index;
    this.openedTab === 0 ? this.GetSocialSharingStatus("Facebook") : this.GetSocialSharingStatus("Google");
  }

  setValues(e: any) {
    this.rating = e.rating;
    this.average = e.average;
    this.votes = e.votes;
  }

  /**
 * Function: Toggle the active status of review sites for Facebook.
 * Toggles the 'isActive' property of the review site with the given id.
 * @param e - The id of the review site to be toggled.
 */
  selectExcludeReviewSitesForFacebook(e: any) {
    this.excludeReviewSitesForFacebook.map((data: any) => {
      if (data.id == e) {
        if (data.isActive == 1) {
          data.isActive = 0;
        } else {
          data.isActive = 1;
        }
      }
    });
  }

  /**
 * Function: Toggle the selection status of a star rating for Facebook.
 * Toggles the 'selected' property of the star rating with the given id.
 * @param e - The id of the star rating to be toggled.
 */
  setRatingselected(e: any) {
    this.excludeStarRatingsForFacebook.map((data: any) => {
      if (data.id == e) {
        if (data.selected == true) {
          data.selected = false;
        } else {
          data.selected = true;
        }
      }
    });
  }

  ShareReviewCardeDialog() {
    const ref: MatDialogRef<ShareReviewCardComponent> = this.dialog.open(
      ShareReviewCardComponent,
      {
        width: ' 940px',
        height: 'auto',

        panelClass: 'custom-container',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  /**
 * Function: Toggle the selection status of a Facebook item.
 * Toggles the 'selected' property of the given item based on its id.
 * @param item - The item to be toggled.
 */
  toggleSelectForFacebook(item: any) {
    this.excludeStarRatingsForFacebook.map((data: any) => {
      if (data.id == item.id) {
        item.selected = !item.selected;
      }
    });
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
  * Function: To copy the selected item from tab
  * @param item: tab items
  */
  copyItem(item: string) {
    this.clipboard.copy(`{${item}}`);

    this.commonService.SnackObervable('Text copied')
  }

  /**
* Function: Handle Facebook listing without Google
*/
  noFacebookListing() {
    loginFb().then((res) => {
      if (res == true) {
        this.access_token = getfbAccessToken();
        this.loadFacebookPage();
      } else {
        this.commonService.SnackObervable('Oops!!!,Facebook not connected. Please try again.');
      }
    })
  }

  /**
 * Function: Load Facebook page based on target
 */
  loadFacebookPage() {
    if (this.access_token?.length > 0) {
      console.log(this.access_token ,"this.access_token?");
      this.getSocialSharingDetails("Facebook", this.access_token)
    }
  }

  /**
  * Function: Close dialog and request Google offline access
  */
  noGoogleListing() {
    this.gAuth.getAuth().subscribe((auth) => {
      auth.grantOfflineAccess().then(res => {
        //Save code
        if (res.code) {
          this.googleCode = res.code
          this.getGoogleToken(this.googleCode)
        }
      });
    });
  }

  /**
* Function: Get Google token using the provided code
* @param code - Authorization code received from Google
*/
  getGoogleToken(code) {
   
  }

  /**
   * Function: Get social sharing status for the provided review source
   * @param reviewSource - The source of the review (e.g., "Google")
   */
  GetSocialSharingStatus(reviewSource: string) {
   
  }


  /**
 * Function: Change the social sharing status for the provided review source
 * @param reviewSource - The source of the review (e.g., "Google")
 * @param IsActive - Boolean value to set the status of social sharing
 */
  changeSocialSharing(reviewSource: string, IsActive: boolean) {
   
  }


  /**
 * Function: Deactivate the social sharing for the provided review source
 * @param reviewSource - The source of the review (e.g., "Google")
 */
  deactivateSocialSharing(reviewSource: string) {
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
    
    });
  }


  /**
   * Handle the change event for the Google sharing toggle.
   * @param event - The toggle change event containing the new checked state of the toggle.
   */
  onGoogleSharingToggleChange(event: MatSlideToggleChange) {
    this.changeSocialSharing("Google", event.checked)
  }

  /**
 * Handle the change event for the Facebook sharing toggle.
 * @param event - The toggle change event containing the new checked state of the toggle.
 */
  onFacebookSharingToggleChange(event: MatSlideToggleChange) {
    this.changeSocialSharing("Facebook", event.checked)
  }


  getSocialSharingDetails(reviewSource: string, accessToken: string) {
  
  }

  /**
 * Function: Retrieve account details from Google
 */
  googleAccountDetailList(): void {
   
  }

  /**
 * Function: Select Exclude Review Sites
 * Toggles 'isActive' status of review sites based on user selection.
 */
  selectExcludeReviewSitesForGoogle(e: any) {
    this.excludeReviewSitesForGoogle.map((data: any) => {
      if (data.id == e) {
        if (data.isActive == 1) {
          data.isActive = 0;
        } else {
          data.isActive = 1;
        }
      }
    });
  }

  /**
 * Function: Toggle Select for Google
 * Toggles 'selected' status of star ratings based on user selection.
 */
  toggleSelectForGoogle(item: any) {
    this.excludeStarRatingsForGoogle.map((data: any) => {
      if (data.id == item.id) {
        item.selected = !item.selected;
      }
    });
  }

  /**
   * Function: Save Form
   * Validates the form and constructs the request object for updating social sharing settings.
   * If the form is valid, it triggers the update social sharing process.
   */
  saveForm() {
    if (this.openedTab === 1) {
      if (this.googleForm.valid) {
        const modal: any = {
          Id: this.socialSharingDetails.Id.toString(),
          AccessToken: this.socialSharingStatus.AccessToken,
          ProfileId: this.profileId,
          Key: this.key,
          PageId: "",
          PageName: "",
          PageAccessToken: "",
          PostTemplate: this.googleForm.value.postTemplate,
          ExcludeStarRating: this.excludeStarRatingsForGoogle
            .filter(item => item.selected)
            .map(item => item.id)
            .join(','),
          ExcludeReviewSites: this.excludeReviewSitesForGoogle
            .filter(item => item.isActive === 1)
            .map(item => item.id)
            .join(','),
          ExcludeNoTextReviews: this.googleForm.value.excludeReviewsWithNoText,
          PostPerDay: this.googleForm.value.maxPostsPerDay,
          ReviewSource: "Google",
          AccountId: this.accountDetails.find((res) => { return res?.Id === this.googleForm.value.googleBusinessLocation })?.AccountId,
          LocationId: this.googleForm.value.googleBusinessLocation,
          BGColour: ""
        }
        this.updateSocialSharing(modal, "Google");
      }
    } else {
      if (this.facebookForm.valid) {
        const modal: any = {
          Id: this.socialSharingDetails.Id.toString(),
          AccessToken: this.access_token,
          ProfileId: this.profileId,
          Key: this.key,
          PageId: this.facebookForm.value.facebookPage,
          PageName: this.facebookAccountDetails.find((ele) => { return ele.id === this.facebookForm.value.facebookPage })?.name,
          PageAccessToken: this.facebookAccountDetails.find((ele) => { return ele.id === this.facebookForm.value.facebookPage })?.access_token,
          PostTemplate: this.facebookForm.value.postTemplate,
          ExcludeStarRating: this.excludeStarRatingsForFacebook
            .filter(item => item.selected)
            .map(item => item.id)
            .join(','),
          ExcludeReviewSites: this.excludeReviewSitesForFacebook
            .filter(item => item.isActive === 1)
            .map(item => item.id)
            .join(','),
          ExcludeNoTextReviews: this.facebookForm.value.excludeReviewsWithNoText,
          PostPerDay: this.facebookForm.value.maxPostsPerDay,
          ReviewSource: "Facebook",
          AccountId: "",
          LocationId: "",
          BGColour: ""
        }
        this.updateSocialSharing(modal, "Facebook")
      }
    }
  }

  /**
 * Function: Update Social Sharing
 * Initiates the spinner, sends the update request, handles response, and updates social sharing status.
 */
  updateSocialSharing(modal: any, reviewSource: string) {
   
  }

  /**
 * Function: Retrieve account details from Facebook
 */
  facebookAccountDetailList(accessToken: string): void {
  
  }
}
