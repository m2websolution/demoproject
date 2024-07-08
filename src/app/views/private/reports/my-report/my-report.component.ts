import { DatePipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';
import * as d3 from "d3";
import Chart, {
  ActiveElement,
  ArcElement,
  Plugin,
  ScriptableContext,
  Tooltip,
} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels, ArcElement, Tooltip);

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.css', '../reports.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class MyReportComponent {
  screenSize?: any;
  openedTab?: number;
  fromDate: Date;
  toDate: Date;
  key: string;
  profileId: string;
  myReport: any;
  averageRatingPr: number;
  reviewLabels: any;
  ratingLabels: any;
  gaugemap:any = {};
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
  notOverallStats: boolean = false;
  notEmailConversionStatsList: boolean = false;
  notSmsConversionStatsList: boolean = false;
  notQrCodeConversionStates: boolean = false;
  reviewByPlatformchart: any;
  qrConversionchart: any;
  ratingByPlatformchart: any;
  overallStatschart: any
  emailConversionchart: any;
  smsConversionchart: any;


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
    this.getMyReport();
  }

  ngOnInit(): void {
  }

  emailConversionData: any = [
    {
      name: 'Customers Invited',
      color: '#FE3F34',
    },
    {
      name: 'Opens',
      color: '#196CFA',
    },
    {
      name: 'Visits',
      color: '#FAA81A',
    },
    {
      name: 'Clickthroughs',
      color: '#22C55E',
    },
  ];

  smsConversionData: any = [
    {
      name: 'Customers Invited',
      color: '#FE3F34',
    },
    {
      name: 'Delivered',
      color: '#196CFA',
    },
    {
      name: 'Visits',
      color: '#FAA81A',
    },
    {
      name: 'Clickthroughs',
      color: '#22C55E',
    },
  ];

  emailStackedMainData = [
    {
      barThickness: 30,
      label: 'Customers Invited',
      borderColor: '#FE3F34',
      backgroundColor: '#FE3F34',
      borderRadius: 7,
    },
    {
      barThickness: 30,
      label: 'Opens',
      borderColor: '#196CFA',
      backgroundColor: '#196CFA',
      borderRadius: 7,
    },
    {
      barThickness: 30,
      grouped: true,
      label: 'Visits',
      borderColor: '#FAA81A',
      backgroundColor: '#FAA81A',
      borderRadius: 7,
    },
    {
      barThickness: 30,
      label: 'Clickthroughs',
      borderColor: '#22C55E',
      backgroundColor: '#22C55E',
      borderRadius: 7,
    },
  ];

  emailStackedbarData: any = {
    data: this.emailStackedMainData,
    aspectRatio: 5 / 3,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        ticks: {
          align: 'start',
          stepSize: 100,
        },
      },
    },
  };

  smsStackedMainData = [
    {
      barThickness: 30,
      label: 'Customers Invited',
      borderColor: '#FE3F34',
      backgroundColor: '#FE3F34',
      borderRadius: 7,
    },
    {
      barThickness: 30,
      label: 'Delivered',
      borderColor: '#196CFA',
      backgroundColor: '#196CFA',
      borderRadius: 7,
    },
    {
      barThickness: 30,
      grouped: true,
      label: 'Visits',
      borderColor: '#FAA81A',
      backgroundColor: '#FAA81A',
      borderRadius: 7,
    },
    {
      barThickness: 30,
      label: 'Clickthroughs',
      borderColor: '#22C55E',
      backgroundColor: '#22C55E',
      borderRadius: 7,
    },
  ];

  smsStackedbarData: any = {
    data: this.smsStackedMainData,
    aspectRatio: 5 / 3,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        ticks: {
          align: 'start',
          stepSize: 100,
        },
      },
    },
  };

  overallSentiment: any = [
    {
      name: 'Poor',
      color: '#dd2a2e',
    },
    {
      name: 'Fair',
      color: '#d67421',
    },
    {
      name: 'Good',
      color: '#cabe1e',
    },
    {
      name: 'Great',
      color: '#7abd1b',
    },
    {
      name: 'Excellent',
      color: '#29b019',
    },
  ];

  ratingData: any = {
    id: 'rating',
    name: 'Rating',
    offset: [60, 60, 60, 60],
    align: ['center', 'center', 'center', 'end'],
    font: {
      size: 12,
    },
  };

  reviewData: any = {
    id: 'review',
    name: 'Reviews',
    offset: [60, 60, 60, 60],
    align: ['center', 'center', 'center', 'end'],
    font: {
      size: 12,
    },
  };

  qrData: any = {
    id: 'qrConversion',
    name: '',
    backgroundColor: ['#FAA81A', '#E2F2FF'],
    color: ['#FAA81A', '#196cfa'],
    offset: [60, 60],
    anchor: ['center', 'center'],
    align: [0, 'center'],
    font: {
      size: 12,
    },
  };

  OverallStatsStackedMainData = [
    {
      label: 'Review stars',
      borderColor: '#4ADE80',
      backgroundColor: '#4ADE80',
      categoryPercentage: 0.8,
      barPercentage: 0.7,
    },
    {
      label: 'Review Count',
      borderColor: '#196CFA',
      backgroundColor: '#196CFA',
      categoryPercentage: 0.8,
      barPercentage: 0.7,
    }
  ];

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

  OverallStatsStackedbarData: any = {
    data: this.OverallStatsStackedMainData,
    aspectRatio: 5 / 2,
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Period',
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
 * Function: Handles the event when the date is changed and triggers the retrieval of the overall QR report.
 * @param event - The event object containing information about the date change.
 */
  dateChanged(event: any): void {
    this.getMyReport();
  }

  /**
 * Function: Handles the event when the date is changed and triggers the retrieval of the user's personal report.
 * @param event - The event object containing information about the date change.
 */
  getMyReport(): void {
   
  }

  /**
 * Retrieves review data by platform and prepares it for display.
 * Calculates the percentage of reviews for each platform, generates colors for each platform, and adjusts arrays for alignment.
 * @param reviewByPlatformData - An array containing review data grouped by platform.
 */
  getReviewDataForDisplay(reviewByPlatformData): void {
    reviewByPlatformData = reviewByPlatformData?.filter(value => value.Reviews !== 0);
  
    const data = reviewByPlatformData?.map(platform => {
      return platform.Reviews;
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
  
    const canvas: any = document.getElementById("review-by-platform");
    const ctx = canvas.getContext('2d');

    // Destroy existing chart instance if it exists
    if (this.reviewByPlatformchart) {
      this.reviewByPlatformchart.destroy();
    }

    this.reviewByPlatformchart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.reviewData.labels,
        datasets: [{
          data: this.reviewData.data,
          backgroundColor: this.reviewData.color,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
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
      this.notRatingByPlatformData = false;
      const data = ratingByPlatformData.map(platform => {
        return platform.Rating;
      });
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

    if (this.ratingByPlatformchart) {
      this.ratingByPlatformchart.destroy();
    }

    let id = "rating-by-platform";
    let stackData = this.ratingStackedbarData;

    this.ratingByPlatformchart = new Chart(id, {
      type: 'bar',
      data: {
        labels: stackData.labels,
        datasets: stackData.data,
      },
      options: {
        responsive: true,
        aspectRatio: 5 / 4,
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            stacked: stackData.scales.x.stacked,
            ticks: {
              align: 'center',
              font: {
                size: 14,
              },
            },
            grid: {
              offset: true,
              display: false,
            },
            min: 0,
            offset: true,
            title: {
              ...stackData.scales.x.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
          y: {
            stacked: stackData.scales.y.stacked,
            ticks: stackData.scales.y.ticks,
            grid: {
              display: true,
              color: '#FAFAFA',
            },
            beginAtZero: true,
            max: stackData.scales.y.max,
            min: stackData.scales.y.min,
            title: {
              ...stackData.scales.y.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 16,
          },
        },
      },
    });
  }

  /**
* Retrieves qrCode data by platform and prepares it for display.
* Calculates the percentage of qrCodes for each platform, generates colors for each platform, and adjusts arrays for alignment.
* @param qrCodeConversionStates - An array containing qrCodes data grouped by platform.
*/
  getQrDataForDisplay(qrCodeConversionStates): void {
    if (qrCodeConversionStates.Clickthroughs === "0" && qrCodeConversionStates.Visits === "0") {
      this.notQrCodeConversionStates = true
      this.qrData['data'] = [];
    } else {
      this.notQrCodeConversionStates = false;
      const qrCodeConversionStatesArray = [];
      for (const key in qrCodeConversionStates) {
        qrCodeConversionStatesArray.push({
          name: key,
          value: qrCodeConversionStates[key]
        });
      }
      const data = qrCodeConversionStatesArray?.map(platform => {
        return platform?.value;
      });
      this.qrData['data'] = data;
    }

    const canvas: any = document.getElementById("qr-conversion");
    const ctx = canvas.getContext('2d');

    // Destroy existing chart instance if it exists
    if (this.qrConversionchart) {
      this.qrConversionchart.destroy();
    }

    this.qrConversionchart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.qrData.labels,
        datasets: [{
          data: this.qrData.data,
          backgroundColor: this.qrData.color,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
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
 * Generates a random hexadecimal color code.
 * @param {number} lightness - The lightness value to generate lighter colors. Should be between 0 and 1. 
 *                             0 generates the lightest colors, 1 generates the original random color.
 * @returns A random hexadecimal color code.
 */
generateRandomColor(lightness = 0.5): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const newR = Math.floor(r + (255 - r) * lightness);
  const newG = Math.floor(g + (255 - g) * lightness);
  const newB = Math.floor(b + (255 - b) * lightness);

  return '#' + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
}

  /**
 * Function: Retrieves overall statistics data for display.
 * This function populates data for displaying overall statistics, including rating, reviews, and invitations, for different periods.
 */
  getOverallStatsDataForDisplay(overallStats): void {
    overallStats = overallStats?.filter(value => (+value?.Rating) !== 0 || (+value?.Reviews) !== 0 );

    if (overallStats?.length === 0) {
      this.notOverallStats = true;
      this.OverallStatsStackedbarData['labels'] = [];
    } else {
      this.notOverallStats = false;
      this.OverallStatsStackedbarData['labels'] = overallStats?.map((res) => res?.Period);
      this.OverallStatsStackedMainData[0]['data'] = this.sortDescending(overallStats.map(item => +(item?.Reviews)));
      this.OverallStatsStackedMainData[1]['data'] = this.sortDescending(overallStats.map(item => +(item?.Rating)));
    }

    if (this.overallStatschart) {
      this.overallStatschart.destroy();
    }

    let id = "overall-stats";
    let stackData = this.OverallStatsStackedbarData;

    this.overallStatschart = new Chart(id, {
      type: 'bar',
      data: {
        labels: stackData.labels,
        datasets: stackData.data,
      },
      options: {
        responsive: true,
        aspectRatio: 5 / 4,
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            stacked: stackData.scales.x.stacked,
            ticks: {
              align: 'center',
              font: {
                size: 14,
              },
            },
            grid: {
              offset: true,
              display: false,
            },
            min: 0,
            offset: true,
            title: {
              ...stackData.scales.x.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
          y: {
            stacked: stackData.scales.y.stacked,
            ticks: stackData.scales.y.ticks,
            grid: {
              display: true,
              color: '#FAFAFA',
            },
            beginAtZero: true,
            max: stackData.scales.y.max,
            min: stackData.scales.y.min,
            title: {
              ...stackData.scales.y.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 16,
          },
        },
      },
    });
  }

  /**
 * Function: Sorts an array of numbers in descending order.
 * Parameters:
 *     - data: An array of numbers to be sorted.
 * Returns: 
 *     - An array of numbers sorted in descending order.
 */
  sortDescending(data: number[]): number[] {
    return data.sort((a, b) => b - a);
  }

  /**
  * Function: Retrieves email conversion data for display.
  * Parameters: None
  * Returns: None
  * Description: Prepares email conversion data for display in a stacked bar chart.
  */
  getEmailConversionDataForDisplay(emailConversionStatsList): void {
    emailConversionStatsList = emailConversionStatsList?.filter(value => (+value?.CustomersInvited) !== 0 || (+value?.Opens) !== 0 || (+value?.Visits) !== 0 || (+value?.Clickthroughs) !== 0);
    if (emailConversionStatsList?.length === 0) {
      this.notEmailConversionStatsList = true;
      this.emailStackedbarData['labels'] = [];
    } else {
      this.notEmailConversionStatsList = false;
      this.emailStackedbarData['labels'] = emailConversionStatsList?.map((res) => res?.Period);
      this.emailStackedMainData[0]['data'] = emailConversionStatsList?.map((res) => +(res?.CustomersInvited));
      this.emailStackedMainData[1]['data'] = emailConversionStatsList?.map((res) => +(res?.Opens));
      this.emailStackedMainData[2]['data'] = emailConversionStatsList?.map((res) => +(res?.Visits));
      this.emailStackedMainData[3]['data'] = emailConversionStatsList?.map((res) => +(res?.Clickthroughs));
    }

    if (this.emailConversionchart) {
      this.emailConversionchart.destroy();
    }

    let id = "email-conversion";
    let stackData = this.emailStackedbarData;

    this.emailConversionchart = new Chart(id, {
      type: 'bar',
      data: {
        labels: stackData.labels,
        datasets: stackData.data,
      },
      options: {
        responsive: true,
        aspectRatio: 5 / 4,
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            stacked: stackData.scales.x.stacked,
            ticks: {
              align: 'center',
              font: {
                size: 14,
              },
            },
            grid: {
              offset: true,
              display: false,
            },
            min: 0,
            offset: true,
            title: {
              ...stackData.scales.x.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
          y: {
            stacked: stackData.scales.y.stacked,
            ticks: stackData.scales.y.ticks,
            grid: {
              display: true,
              color: '#FAFAFA',
            },
            beginAtZero: true,
            max: stackData.scales.y.max,
            min: stackData.scales.y.min,
            title: {
              ...stackData.scales.y.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 16,
          },
        },
      },
    });
  }

  /**
 * Function: Retrieves SMS conversion data for display.
 * Parameters: None
 * Returns: None
 * Description: Prepares SMS conversion data for display in a stacked bar chart.
 */
  getSMSConversionDataForDisplay(smsConversionStatsList): void {
    smsConversionStatsList = smsConversionStatsList?.filter(value => (+value?.CustomersInvited) !== 0 || (+value?.Delivered) !== 0 || (+value?.Visits) !== 0 || (+value?.Clickthroughs) !== 0);

    if (smsConversionStatsList?.length === 0) {
      this.notSmsConversionStatsList = true;
      this.smsStackedbarData['labels'] = [];
    } else {
      this.notSmsConversionStatsList = false;
      this.smsStackedbarData['labels'] = smsConversionStatsList?.map((res) => res?.Period);
      this.smsStackedMainData[0]['data'] = smsConversionStatsList?.map((res) => +(res?.CustomersInvited));
      this.smsStackedMainData[1]['data'] = smsConversionStatsList?.map((res) => +(res?.Delivered));
      this.smsStackedMainData[2]['data'] = smsConversionStatsList?.map((res) => +(res?.Visits));
      this.smsStackedMainData[3]['data'] = smsConversionStatsList?.map((res) => +(res?.Clickthroughs));
    }

    if (this.smsConversionchart) {
      this.smsConversionchart.destroy();
    }

    let id = "sms-conversion";
    let stackData = this.smsStackedbarData;

    this.smsConversionchart = new Chart(id, {
      type: 'bar',
      data: {
        labels: stackData.labels,
        datasets: stackData.data,
      },
      options: {
        responsive: true,
        aspectRatio: 5 / 4,
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            stacked: stackData.scales.x.stacked,
            ticks: {
              align: 'center',
              font: {
                size: 14,
              },
            },
            grid: {
              offset: true,
              display: false,
            },
            min: 0,
            offset: true,
            title: {
              ...stackData.scales.x.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
          y: {
            stacked: stackData.scales.y.stacked,
            ticks: stackData.scales.y.ticks,
            grid: {
              display: true,
              color: '#FAFAFA',
            },
            beginAtZero: true,
            max: stackData.scales.y.max,
            min: stackData.scales.y.min,
            title: {
              ...stackData.scales.y.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 16,
          },
        },
      },
    });
  }

  /**
 * Function: Draws a power gauge visualization.
 * Parameters: None
 * Returns: None
 * Description: Renders a power gauge visualization using D3.js library.
 */
  draw() {
    let self = this;
    let gauge = (container, configuration) => {
      var config = {
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 5,
        labelFormat: (value) => {
          if (value < 2) return "Poor";
          else if (value < 4) return "Fair";
          else if (value < 6) return "Good";
          else if (value < 8) return "Great";
          else if (value < 10) return "Excellent";
          else return "";
        },
        labelInset: 10,

        arcColorFn: d3.interpolateHsl(d3.rgb('#DD2A2E'), d3.rgb('#16A34A'))
      };

      let range = undefined;
      let r = undefined;
      let pointerHeadLength = undefined;
      let value = 0;

      let svg = undefined;
      let arc = undefined;
      let scale = undefined;
      let ticks = undefined;
      let tickData = undefined;
      let pointer = undefined;

      let donut = d3.pie();

      function deg2rad(deg) {
        return deg * Math.PI / 180;
      }

      function newAngle(d) {
        let ratio = scale(d);
        let newAngle = config.minAngle + (ratio * range);
        return newAngle;
      }

      function configure(configuration) {
        let prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });

        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d: any, i) {
            var ratio = d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle(function (d: any, i) {
            var ratio = d * (i + 1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }

      function centerTranslation() {
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return (svg !== undefined);
      }

      function render(newValue) {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        let centerTx = centerTranslation();

        let arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function (d, i) {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        let lg = svg.append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);

        lg.selectAll('text')
          .data(ticks)
          .enter().append('text')
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .attr('fill', '#000')
          .attr('transform', function (d) {
            var ratio = scale(d);
            var newAngle = config.minAngle + (ratio * range);
            return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
          })
          .text(config.labelFormat);

        svg.append('text')
          .attr('class', 'gauge-label')
          .attr('text-anchor', 'middle')
          .attr('fill', '#000')
          .attr('transform', 'translate(' + r + ',' + (r + config.labelInset) + ')')

        let lineData = [[config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];
        let pointerLine = d3.line().curve(d3.curveLinear)
        let pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg.append('path')
          .attr('d', pointerLine)
          .attr('transform', 'rotate(' + config.minAngle + ')');

        update(newValue === undefined ? 0 : newValue, undefined);
      }

      function update(newValue, newConfiguration) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        let ratio = scale(newValue);
        let newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }

      configure(configuration);

      return {
        render: render,
        update: update,
        isRendered: isRendered
      };
    };

    const powerGaugeContainer = document.getElementById('power-gauge');

    while (powerGaugeContainer.firstChild) {
      powerGaugeContainer.removeChild(powerGaugeContainer.firstChild);
    }

    let powerGauge = gauge('#power-gauge', {
      size: 300,
      clipWidth: 300,
      clipHeight: 200,
      ringWidth: 60,
      maxValue: 10,
      transitionMs: 4000,
    });

    let avgSentimentRating = +this.myReport?.AvgSentimentRating;
    powerGauge.render(avgSentimentRating);
  }
}
