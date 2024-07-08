import { Component, Input } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-review-page-settings',
  templateUrl: './review-page-settings.component.html',
  styleUrls: ['./review-page-settings.component.css'],
})

export class ReviewPageSettingsComponent {
  connectedPlatformCount: number = 4;
  breakpoint: any;
  rating: any;
  votes: any;
  average: any;
  @Input() layoutListSettings: any[];
  @Input() headerOptions: any;
  key: string;
  profileId: string;
  landingPageSettings: any;
  layoutList: any[];
  connectedPlatforms: any[];
  updateLandingPage: any;
  thumbs: boolean;
  stars: boolean;
  faces: boolean;
  nps: boolean;
  location: boolean;
  reviewPlatform: boolean;
  thumbsId: number;
  starsId: number;
  facesId: number;
  npsId: number;
  locationId: number;
  reviewPlatformId: number;
  active: boolean[];
  updatedPage: number;
  selectedReviews: string[];
  hasMultiLocation: boolean;
  starwidth: { width: string, height: string, marginRight: string };

  constructor(private commonService: CommonService, private errorHandler: ErrorHandlerService, private privateService: PrivateServices) {
    this.active = [];
    this.thumbs = false;
    this.stars = false;
    this.faces = false;
    this.nps = false;
    this.location = false;
    this.reviewPlatform = false;
    this.thumbsId = -1;
    this.starsId = -1;
    this.facesId = -1;
    this.npsId = -1;
    this.locationId = -1;
    this.reviewPlatformId = -1;
    this.selectedReviews = [];
    this.hasMultiLocation = false;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.updatedPage = 1;
    this.starwidth = { width: '60px', height: '90px', marginRight: ' 12px' };
  }

  ngOnInit() {
    this.getLandingPageSettings();
    this.getConnectedplatform();
    if (this.layoutListSettings) {
      this.thumbs = this.layoutListSettings.some(obj => obj.LayoutName === 'Thumbs');
      this.stars = this.layoutListSettings.some(obj => obj.LayoutName === 'Stars');
      this.faces = this.layoutListSettings.some(obj => obj.LayoutName === 'Faces');
      this.nps = this.layoutListSettings.some(obj => obj.LayoutName === 'NPS');
      this.location = this.layoutListSettings.some(obj => obj.LayoutName === 'Location');
      this.reviewPlatform = this.layoutListSettings.some(obj => obj.LayoutName === 'Review Platforms');
      this.thumbsId = this.layoutListSettings.find(obj => obj.LayoutName === 'Thumbs')?.LayoutId;
      this.starsId = this.layoutListSettings.find(obj => obj.LayoutName === 'Stars')?.LayoutId;
      this.facesId = this.layoutListSettings.find(obj => obj.LayoutName === 'Faces')?.LayoutId;
      this.npsId = this.layoutListSettings.find(obj => obj.LayoutName === 'NPS')?.LayoutId;
      this.locationId = this.layoutListSettings.find(obj => obj.LayoutName === 'Location')?.LayoutId;
      this.reviewPlatformId = this.layoutListSettings.find(obj => obj.LayoutName === 'Review Platforms')?.LayoutId;
    }
    if (window.innerWidth > 500 && window.innerWidth < 1200) {
      this.breakpoint = 3;
      this.starwidth = { width: ' 54px', height: '80px', marginRight: ' 9px' };
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 1;
      this.starwidth = { width: '24px', height: '37px', marginRight: ' 6px' };
    }

    this.commonService.$updateProfile.subscribe(value => {
      if (value) {
        this.hasMultiLocation = value.hasMultiLocation;
      }
    })
  }

  /**
    * Function: Sends the landing page url to review-page component
    * @returns landing page url
    */
  getDataLink(): string {
    return this.landingPageSettings.LandingPageUrl;
  }

  /**
    * Function: Updates landing page details on threshold dropdown selection change.
    *  * @param event for dropdown threshold option change
    */
  onSelectionChange(event: MatSelectChange): void {
    this.landingPageSettings.Threshold = event.value;
    this.updateLandingPageSettings();
  }

  /**
    * Function: Updates landing page details on autodirection or IsOpenSameTab change.
    */
  onToggleChange(): void {
    this.updateLandingPage.AutoRedirection = this.landingPageSettings.AutoRedirection;
    this.updateLandingPage.IsOpenSameTab = this.landingPageSettings.IsOpenSameTab;
    this.updateLandingPageSettings();
  }

  ngOnChanges() {
    this.commonService.SpinnerObervable(true);
    this.thumbs = this.layoutListSettings.some(obj => obj.LayoutName === 'Thumbs');
    this.stars = this.layoutListSettings.some(obj => obj.LayoutName === 'Stars');
    this.faces = this.layoutListSettings.some(obj => obj.LayoutName === 'Faces');
    this.nps = this.layoutListSettings.some(obj => obj.LayoutName === 'NPS');
    this.location = this.layoutListSettings.some(obj => obj.LayoutName === 'Location');
    this.reviewPlatform = this.layoutListSettings.some(obj => obj.LayoutName === 'Review Platforms');
    this.thumbsId = this.layoutListSettings.find(obj => obj.LayoutName === 'Thumbs')?.LayoutId;
    this.starsId = this.layoutListSettings.find(obj => obj.LayoutName === 'Stars')?.LayoutId;
    this.facesId = this.layoutListSettings.find(obj => obj.LayoutName === 'Faces')?.LayoutId;
    this.npsId = this.layoutListSettings.find(obj => obj.LayoutName === 'NPS')?.LayoutId;
    this.locationId = this.layoutListSettings.find(obj => obj.LayoutName === 'Location')?.LayoutId;
    this.reviewPlatformId = this.layoutListSettings.find(obj => obj.LayoutName === 'Review Platforms')?.LayoutId;
    this.selectedReviews = this.layoutListSettings.find(obj => obj.LayoutId === this.landingPageSettings.LayoutId)?.Threshold;
    this.commonService.SpinnerObervable(false);
  }

  /**
  * Function: Apply review-page-layout-card-active class to selected layout.
  * @param layoutName: selected layout
  */
  selectedCard(layoutName: string, id: number): void {
    switch (layoutName) {
      case 'Thumbs': {
        this.active[this.thumbsId] = true;
        this.active[this.starsId] = false;
        this.active[this.facesId] = false;
        this.active[this.npsId] = false;
        this.active[this.locationId] = false;
        this.active[this.reviewPlatformId] = false;
        this.landingPageSettings.Threshold = 'Thumbs up to review';
        break;
      }

      case 'Stars': {
        this.active[this.starsId] = true;
        this.active[this.thumbsId] = false;
        this.active[this.facesId] = false;
        this.active[this.npsId] = false;
        this.active[this.locationId] = false;
        this.active[this.reviewPlatformId] = false;
        this.landingPageSettings.Threshold = '4 star or more to review';
        break;
      }

      case 'Faces':
        this.active[this.facesId] = true;
        this.active[this.thumbsId] = false;
        this.active[this.starsId] = false;
        this.active[this.npsId] = false;
        this.active[this.locationId] = false;
        this.active[this.reviewPlatformId] = false;
        this.landingPageSettings.Threshold = 'Happy or neutral face to review';
        break;

      case 'NPS':
        this.active[this.npsId] = true;
        this.active[this.thumbsId] = false;
        this.active[this.starsId] = false;
        this.active[this.facesId] = false;
        this.active[this.locationId] = false;
        this.active[this.reviewPlatformId] = false;
        this.landingPageSettings.Threshold = '9 or more to review';
        break;

      case 'Location':
        this.active[this.locationId] = true;
        this.active[this.thumbsId] = false;
        this.active[this.starsId] = false;
        this.active[this.facesId] = false;
        this.active[this.npsId] = false;
        this.active[this.reviewPlatformId] = false;
        break;

      case 'Review Platforms':
        this.active[this.reviewPlatformId] = true;
        this.active[this.thumbsId] = false;
        this.active[this.starsId] = false;
        this.active[this.facesId] = false;
        this.active[this.npsId] = false;
        this.active[this.locationId] = false;
        break;

      default:
        break;
    }
    this.selectedReviews = this.layoutListSettings.find(obj => obj.LayoutId === id)?.Threshold;
    this.landingPageSettings.LayoutId = id;
    this.updateLandingPageSettings();
  }

  /**
    * Function: Drag and drop platform
    * @param CdkDragDrop<GetConnectedPlatformList[]>: event emitted when the we drops the platform inside a drop container
    */
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.connectedPlatforms, event.previousIndex, event.currentIndex);
    moveItemInArray(this.updateLandingPage.Platforms, event.previousIndex, event.currentIndex);
    this.updateLandingPage.Platforms.forEach((obj) => {
      obj.IsPrimary = false;
    });
    this.updateLandingPage.Platforms[0].IsPrimary = true;
    this.updateLandingPageSettings();
  }

  onResize(event: any) {
    if (window.innerWidth > 500 && window.innerWidth < 1200) {
      this.breakpoint = 3;
      this.starwidth = { width: ' 54px', height: '80px', marginRight: ' 9px' };
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 3;
      this.starwidth = { width: ' 62px', height: '90px', marginRight: ' 12px' };
    } else {
      this.breakpoint = 1;
      this.starwidth = { width: ' 24px', height: '37px', marginRight: ' 6px' };
    }
  }

  setValues(e: any) {
    this.rating = e.rating;
    this.average = e.average;
    this.votes = e.votes;
  }

  /**
    * Function: Gets the layout list
    */
  getLandingPageSettings(): void {
   
  }

  /**
    * Function: Gets the layout list
    */
  updateLandingPageSettings(): void {
  
  }

  /**
    * Function: Gets the connected platform
    */
  getConnectedplatform(): void {
   
  }
}
