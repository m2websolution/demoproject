/// <reference types="@types/google.maps" />
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConstant } from '../../constants';
import { CommonService } from '../../services/common.services';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { GoogleAuthService } from 'ng-gapi';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';

declare function loginFb(): any;
declare function getfbAccessToken(): any;
declare function intitFb(): any;

@Component({
  selector: 'app-collect-platform-model',
  templateUrl: './collect-platform-model.component.html',
  styleUrls: ['./collect-platform-model.component.css'],
})
export class CollectPlatformModelComponent implements OnInit {
  panelOpenState = false;
  isEditMode: boolean;
  title: string;
  profileId: string;
  placeId: string;
  connectPlatformModelForm: FormGroup;
  connectPlatformModel: any;
  updateConnectedPlatform: any;
  loading: boolean;
  isModelForConnectPlatform: boolean;
  googleCode: any;
  access_token: string = '';
  key: string;
  reviewConnectedCount: any;
  @ViewChild('map') public mapElementRef: ElementRef;

  @ViewChild('pacCard') public cardElement: ElementRef;

  @ViewChild('pacInput') public inputElement: ElementRef;

  @ViewChild('infowindowContent') public infowindowContentElement: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private commonService: CommonService, private dialogRef: MatDialogRef<CollectPlatformModelComponent>, private errorHandler: ErrorHandlerService,
    public gAuth: GoogleAuthService, public dialog: MatDialog, public http: HttpClient, public router: Router, private privateServices: PrivateServices) {
    this.isModelForConnectPlatform = (data.ReviewSiteName === "Google" || data.ReviewSiteName === "Facebook") && !this.data.IsActive ? true : false;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);

    this.profileId = this.commonService.GetLocalStorage("profileId");
    this.title = data.ReviewSiteName;
    this.loading = false;
    if (this.data.IsActive) {
      this.isEditMode = true;
    }
    // Disable the form control based on conditions during creation
    const siteUrlControl = this.fb.control({ value: '', disabled: this.isEditMode || this.data.IsActive }, [this.urlValidator(this.data.ReviewSiteName)]);

    // Initialize the form with a URL validator
    this.connectPlatformModelForm = this.fb.group({
      CollectReview: data.Category === 'Collect and Get Reviews' ? true : false,
      HasDisplayOnReviewPage: true
    });
    // Update the form group with the control
    this.connectPlatformModelForm.setControl('SiteURL', siteUrlControl);
  }

  ngOnInit(): void {
    if (this.data.IsActive) {
      this.isEditMode = true;
      // Populate the form controls with existing data for edit mode
      this.populateFormWithData();
      const siteUrlControl = this.connectPlatformModelForm.get('SiteURL');
      if (this.isEditMode || this.data.IsActive) {
        siteUrlControl.disable();
      } else {
        siteUrlControl.enable();
      }
    }

    intitFb();
  }

  ngAfterViewInit() {
    if (this.data.ReviewSiteName === "Google" && !this.isEditMode && !this.isModelForConnectPlatform) { this.initMap(); }
  }

  /**
   * Function: Fetch data for edit mode and set it to the form controls
   */
  populateFormWithData(): void {
    this.connectPlatformModelForm.patchValue({
      SiteURL: this.data.SiteURL,
      CollectReview: this.data.CollectReview,
      HasDisplayOnReviewPage: this.data.GetReview
    });
  }

  /**
     * Function: Post data to connect platform to profile.
     */
  connectPlatform() {
    this.commonService.SpinnerObervable(true);
    this.loading = true; // Set loading to true before making the API call
    if (this.isEditMode) {
      this.updateConnectedPlatform.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
      this.updateConnectedPlatform.reviewPlatformId = this.data.Id;
      this.updateConnectedPlatform.hasFetchReview = this.connectPlatformModelForm.get('CollectReview').value;
      this.updateConnectedPlatform.hasShowonReviewPage = this.connectPlatformModelForm.get('HasDisplayOnReviewPage').value;
    }
    else {
      this.connectPlatformModel.Key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
      this.connectPlatformModel.BusinessName = (this.data.ReviewSiteName === "Google") ? this.data.ReviewSiteName : '';
      this.connectPlatformModel.SiteURL = this.data.ReviewSiteName === "Google" ? '' : this.connectPlatformModelForm.get('SiteURL').value;
      this.connectPlatformModel.ProfileId = this.profileId;
      this.connectPlatformModel.SiteName = this.data.ReviewSiteName;
      this.connectPlatformModel.GooglePlaceId = !this.placeId ? '' : this.placeId;
      this.connectPlatformModel.CollectReview = this.connectPlatformModelForm.get('CollectReview').value;
      this.connectPlatformModel.HasDisplayOnReviewPage = this.connectPlatformModelForm.get('HasDisplayOnReviewPage').value;
    }
  }

  /**
   * initMap() : Integrates google map api with autoComplete searchbox
   */
  initMap(): void {
    const map = new google.maps.Map(
      this.mapElementRef.nativeElement as HTMLElement,
      {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      },
    );
    const options = {
      fields: ["formatted_address", "geometry", "name", "place_id"],
      strictBounds: false,
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.cardElement.nativeElement as HTMLElement);

    const autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement as HTMLInputElement, options);

    autocomplete.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = this.infowindowContentElement.nativeElement as HTMLElement;

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({ map, anchorPoint: new google.maps.Point(0, -29) });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();
      this.placeId = place ? place.place_id : ''
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent = place.formatted_address;
      infowindow.open(map, marker);
    });
  }


  /**
  Function: Handle click event and perform necessary actions
  */
  handleClick(): void {
    this.isModelForConnectPlatform = false;
    if (this.data.ReviewSiteName === "Google") {
      this.initMap();
    }
  }

  /**
   * Function: Navigate back to previous state
   */
  goBack(): void {
    this.isModelForConnectPlatform = true;
  }

  /**
  * Function: Close dialog and request Google offline access
  */
  noGoogleListing() {
    this.dialog.closeAll();
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
    this.commonService.SpinnerObervable(true);
    
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
      localStorage.setItem('FacebooksignInToken', this.access_token);
      if (localStorage.getItem('HasOnboarding') == 'true') {
        this.dialog.closeAll();
        this.router.navigate(['/account-details'], { queryParams: { AuthenticationWith: 'Facebook' } });
      } else {
        this.dialog.closeAll();
        this.router.navigate(['/auth/onboarding/account-details'], { queryParams: { AuthenticationWith: 'Facebook' } });
      }
    }
  }

  /**
 * Function: URL Validator for review sites
 * @param reviewSite - The review site for which the URL needs to be validated
 * @returns Validator function
 */
  urlValidator(reviewSite: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const urlPatternMap = {
        'Yelp': /^https:\/\/www\.yelp\.com\/biz\/.+$/,
        'Booking': /^https:\/\/www\.booking\.com\/hotel\/.+\/\.html$/,
        'Capterra': /^https:\/\/www\.capterra\.com\/p\/.+\/.+/,
        'Glassdoor': /^https:\/\/www\.glassdoor\.co\.in\/Reviews\/.+\.(htm|html)$/,
        'Indeed': /^https:\/\/www\.indeed\.com\/cmp\/.+\/reviews$/,
        'TripAdvisor': /^https:\/\/www\.tripadvisor\.com\/.+/,
        'TrustedShops': /^https:\/\/www\.trustedshops\.com\/buyerrating\/.+/,
        'Trustpilot': /^https:\/\/www\.trustpilot\.com\/review\/.+/,
        'Playstore': /^https:\/\/play\.google\.com\/store\/apps\/details\?id=.+/,
        'Apple Store': /^https:\/\/apps\.apple\.com\/us\/app\/.+\/.+/,
        'Agoda': /^https:\/\/www\.agoda\.com\/.+\/.+\/.+\.html$/,
        'Airbnb': /^https:\/\/www\.airbnb\.com\/rooms\/.+/,
        'AlternativeTo': /^https:\/\/www\.alternativeto\.net\/software\/.+/,
        'Angies List': /^https:\/\/www\.angieslist\.com\/companylist\/us\/.+/,
        'Avvo': /^https:\/\/www\.avvo\.com\/attorneys\/.+/,
        'BBB': /^https:\/\/www\.bbb\.org\/.+/,
        'CarGurus': /^https:\/\/www\.cargurus\.com\/Cars\/.+/,
        'Cars.com': /^https:\/\/www\.cars\.com\/dealers\/.+/,
        'Citysearch': /^https:\/\/www\.citysearch\.com\/profile\/.+/,
        'Consumer Affairs': /^https:\/\/www\.consumeraffairs\.com\/computers\/.+/,
        'CreditKarma': /^https:\/\/www\.creditkarma\.com\/reviews\/.+/,
        'Customer Lobby': /^https:\/\/www\.customerlobby\.com\/reviews\/.+/,
        'DealerRater': /^https:\/\/www\.dealerrater\.com\/dealer\/.+/,
        'Edmunds': /^https:\/\/www\.edmunds\.com\/dealerships\/.+/,
        'Expedia': /^https:\/\/www\.expedia\.com\/.+/,
        'GreatSchools': /^https:\/\/www\.greatschools\.org\/.+/,
        'HealthGrades': /^https:\/\/www\.healthgrades\.com\/.+/,
        'HomeAdvisor': /^https:\/\/www\.homeadvisor\.com\/.+/,
        'Homestars': /^https:\/\/www\.homestars\.com\/companies\/.+/,
        'Hotels': /^https:\/\/www\.hotels\.com\/.+/,
        'Houzz': /^https:\/\/www\.houzz\.com\/pro\/.+/,
        'Insider Pages': /^http:\/\/www\.insiderpages\.com\/.+\/.+#reviews$/,
        'Lawyers.com': /^https:\/\/www\.lawyers\.com\/.+/,
        'LendingTree': /^https:\/\/www\.lendingtree\.com\/.+/,
        'Martindale': /^https:\/\/www\.martindale\.com\/organization\/.+/,
        'NewEgg': /^https:\/\/www\.newegg\.com\/.+/,
        'Niche': /^https:\/\/www\.niche\.com\/.+/,
        'OpenRice': /^https:\/\/www\.openrice\.com\/.+/,
        'OpenTable': /^https:\/\/www\.opentable\.com\/.+/,
        'Product Hunt': /^https:\/\/www\.producthunt\.com\/posts\/.+/,
        'ProductReview': /^https:\/\/www\.productreview\.com\.au\/listings\/.+/,
        'RateMDs': /^https:\/\/www\.ratemds\.com\/.+/,
        'Siftery': /^https:\/\/www\.siftery\.com\/.+/,
        'Sitejabber': /^https:\/\/www\.sitejabber\.com\/reviews\/.+/,
        'Software Advice': /^https:\/\/www\.softwareadvice\.com\/.+/,
        'The Knot': /^https:\/\/www\.theknot\.com\/marketplace\/.+/,
        'Thumbtack': /^https:\/\/www\.thumbtack\.com\/.+/,
        'Trulia': /^https:\/\/www\.trulia\.com\/profile\/.+/,
        'TrustRadius': /^https:\/\/www\.trustradius\.com\/products\/.+/,
        'Vitals': /^https:\/\/www\.vitals\.com\/.+\/.+\/reviews$/,
        'Walmart': /^https:\/\/www\.walmart\.com\/ip\/.+\/.+$/,
        'WeddingWire': /^https:\/\/www\.weddingwire\.com\/biz\/.+\.html$/,
        'Yell': /^https:\/\/www\.yell\.com\/biz\/.+/,
        'Yellow Pages': /^https:\/\/www\.yellowpages\.com\/.+/,
        'Zillow': /^https:\/\/www\.zillow\.com\/.+/,
        'ZocDoc': /^https:\/\/www\.zocdoc\.com\/.+/,
        'Zomato': /^https:\/\/www\.zomato\.com\/.+/,
        'Deliveroo': /^https:\/\/deliveroo\.ae\/menu\/.+\/.+\/.+$/,
        'WebMD': /^https:\/\/doctor\.webmd\.com\/doctor\/.+\/.+/,
      };
      const pattern = urlPatternMap[reviewSite];
      const valid = pattern && pattern.test(control.value);
      return valid ? null : { 'invalidUrl': { value: control.value } };
    };
  }  
}
