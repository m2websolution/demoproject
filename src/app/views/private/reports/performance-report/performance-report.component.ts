import { DatePipe } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { DoughnutPlatformComponent } from 'src/app/shared/components/charts/doughnut-platform/doughnut-platform.component';
import { StackedBarComponent } from 'src/app/shared/components/charts/stacked-bar/stacked-bar.component';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';



@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css', '../reports.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class PerformanceReportComponent {
  screenSize?: any;
  fromDate: Date;
  toDate: Date;
  key: string;
  profileId: string;
  overAllReport: any;
  profileWise: any[] = [];
  reviewLabels: any;
  siteWiseRatings: any[] = [];
  platformsWiseColors: any = [
    { platform: "Google", color: "#FAA81A" },
    { platform: "Facebook", color: "#196CFA" },
    { platform: "Yelp", color: "#F95250" },
    { platform: "Booking", color: "#FFCCCC" },
    { platform: "Capterra", color: "#22C55E" },
    { platform: "Glassdoor", color: "#FFD700" },
    { platform: "Indeed", color: "#87CEEB" },
    { platform: "TripAdvisor", color: "#FFB6C1" },
    { platform: "TrustedShops", color: "#D8BFD8" },
    { platform: "Trustpilot", color: "#98FB98" },
    { platform: "Playstore ", color: "#FFFF99" },
    { platform: "Apple Store", color: "#FFDAB9" }
  ];
  notReviewByPlatformData: boolean = false;
  notRatingByPlatformData: boolean = false;
  averageRatingPr: number;
  @ViewChild(DoughnutPlatformComponent) doughnutPlatformComponent: DoughnutPlatformComponent;
  @ViewChild(StackedBarComponent) stackedBarComponent: StackedBarComponent;

  constructor(private layoutService: LayoutService,
    private commonService: CommonService,
    private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private datePipe: DatePipe
  ) {
    this.screenSize = this.layoutService.screenSize;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.fromDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
    this.toDate = new Date();
    this.getOverAllReport();
  }



  ratingData: any = {
    id: 'rating',
    name: 'Rating',
    data: [24, 26, 39, 11],
    backgroundColor: ['#FFF9C3', '#DCFCE7', '#E2F2FF', '#F95250'],
    color: ['#FBC023', '#22C55E', '#196CFA', '#FFFFFF'],
    offset: [0, 0, 0, 60],
    anchor: ['center', 'center', 'center', 'center'],
    align: ['center', 'center', 'center', 'end'],
    font: {
      size: 14,
    },
  };

  reviewData: any = {
    id: 'review',
    name: 'Reviews',
    offset: [0, 0, 0, 60],
    align: ['center', 'center', 'center', 'end'],
    font: {
      size: 14,
    },
  };

  ratingStackedMainData = [
    {
      label: 'Rating',
      categoryPercentage: 0.8,
      barPercentage: 0.7,
    }
  ];

  ratingStackedbarData: any = {
    data: this.ratingStackedMainData,
    aspectRatio: 5 / 2,
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Rating',
          color: '#18181B',
          font: {
            family: 'Manrope',
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        stacked: false,
        min: 0,
        title: {
          display: true,
          text: 'Counts',
          color: '#18181B',
          font: {
            family: 'Manrope',
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          align: 'start',
          stepSize: 5,
        },
      },
    },
  };

  /**
 * Function: Get Overall Report
 * Description: Retrieves the overall report data from the server and handles the response accordingly.
 */
  getOverAllReport(): void {
   
  }

  /**
* Function: Handles the event when the date is changed and triggers the retrieval of the overall QR report.
*/
  dateChanged(event: any): void {
    this.getOverAllReport();
  }

  /**
 * Retrieves review data by platform and prepares it for display.
 * Calculates the percentage of reviews for each platform, generates colors for each platform, and adjusts arrays for alignment.
 * @param reviewByPlatformData - An array containing review data grouped by platform.
 */
  getReviewDataForDisplay(reviewByPlatformData): void {
    reviewByPlatformData = reviewByPlatformData?.filter(value => value.Reviews !== 0);

    const data = reviewByPlatformData?.map(platform => {
      return platform.Reviews
    });

    if (reviewByPlatformData?.length === 0) {
      this.notReviewByPlatformData = true;
      this.reviewData['data'] = [];
      this.reviewLabels = [];
    } else {
      this.notReviewByPlatformData = false;
      this.reviewData['data'] = data;

      this.reviewLabels = reviewByPlatformData?.map(item => {
        return {
          name: item.SiteName,
          color: this.platformsWiseColors?.find(p => p.platform === item.SiteName)?.color ? this.platformsWiseColors?.find(p => p?.platform === item?.SiteName)?.color : this.generateRandomColor()
        };
      });

      this.reviewData['offset'] = this.adjustArrayLength(this.reviewData['offset'], reviewByPlatformData?.length);
      this.reviewData['align'] = this.adjustArrayLength(this.reviewData['align'], reviewByPlatformData?.length);
      this.reviewData['backgroundColor'] = this.reviewLabels?.map(label => label?.color);
      this.reviewData['color'] = this.reviewLabels?.map(label => label.color);
      this.reviewData['anchor'] = this.reviewLabels?.map(label => 'center');
    }
    this.doughnutPlatformComponent?.createChart();
  }

  /**
* Generates a random hexadecimal color code.
* @returns A random hexadecimal color code.
*/
  generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  /**
* Adjusts the length of an array to match a specified length, duplicating the last element if necessary.
* @param array - The array to be adjusted.
* @param length - The desired length of the array.
* @returns An array with adjusted length.
*/
  adjustArrayLength(array: any[], length: number): any[] {
    if (array.length < length) {
      const difference = length - array.length;
      for (let i = 0; i < difference; i++) {
        array.push(array[array.length - 1]);
      }
    }
    return array.slice(0, length);
  }

  /**
* Retrieves rating data by platform and prepares it for display.
* Calculates the percentage of ratings for each platform, generates colors for each platform, and adjusts arrays for alignment.
* @param ratingByPlatformData - An array containing rating data grouped by platform.
*/
  getRatingDataForDisplay(ratingByPlatformData): void {
    ratingByPlatformData = ratingByPlatformData?.filter(value => value?.Rating !== 0);
    if (ratingByPlatformData?.length === 0) {
      this.notRatingByPlatformData = true
      this.ratingStackedbarData['labels'] = [];
    } else {
      const data = ratingByPlatformData.map(platform => {
        return platform.Rating;
      });
      this.notRatingByPlatformData = false;
      this.ratingStackedbarData['labels'] = ratingByPlatformData?.map(platform => {
        return platform?.SiteName;
      });
      const color = [];
      ratingByPlatformData.forEach((res) => {
        color.push(
          this.platformsWiseColors?.find(p => p?.platform === res?.SiteName).color ? this.platformsWiseColors?.find(p => p?.platform === res?.SiteName).color : this.generateRandomColor());
      });

      this.ratingStackedMainData[0]['data'] = data;
      this.ratingStackedMainData[0]['borderColor'] = color;
      this.ratingStackedMainData[0]['backgroundColor'] = color;
    }

    this.stackedBarComponent?.createChart()
  }
}
