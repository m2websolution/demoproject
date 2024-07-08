import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { SwiperOptions } from 'swiper';
import * as moment from 'moment';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import * as d3 from "d3";
import Chart, {
  ActiveElement,
  ArcElement,
  Plugin,
  ScriptableContext,
  Tooltip,
} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
Chart.register(ChartDataLabels, ArcElement, Tooltip);

// This declaration allows TypeScript to recognize the '$' symbol as a reference to jQuery.
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  breakpoint: any;
  isExpanded = true;
  screenSize?: any;
  showPlatformReviewCount: number = 4;

  profileId: string = "";
  key: string = "";
  model: any | undefined;
  profileList: any | undefined;
  HasConnectedIntegrations: boolean = false;
  HasConnectedReviewSites: boolean = false;
  HasInvitedCustomer: boolean = false;
  HasReport: boolean = false;
  sentimentModel: any;
  emailConversions: any[];
  overAllSentiments: any;
  profileName: string;
  subscription: Subscription;
  startDate: string;
  endDate: string;
  overAllTotalReview: number;
  isDashboardCalled: boolean;
  emailConversionchart: any;
  notEmailConversionStatsList: boolean = false;
  profilesData: string;
  profileDetails: any = {};
  notificationModel1: boolean = false;
  smsCredit: boolean = false;
  emailCredit: boolean = false;
  isSquareBox: boolean = true
  userType : string;
  warningModel: boolean = false;

  totalReview: {
    totalReviewBefore: number;
    totalReviews: number;
    totalReviewDifference: number;
  } = {
      totalReviewBefore: 0,
      totalReviews: 0,
      totalReviewDifference: 0
    };

  reviewRatingData = [
    {
      title: 'Positive Review',
      discription: 'Number of new reviews received',
      icon: 'positive-review',
      count: 0,
      percentage: 0,
      isPositive: false,
    },
    {
      title: 'Invitations',
      discription: 'Number of customers invited.',
      icon: 'invitation',
      count: 0,
      percentage: 0,
      isPositive: false,
    },
    {
      title: 'Landing Page',
      discription: 'Number of customer visits to landing page',
      icon: 'landing-page',
      count: 0,
      percentage: 0,
      isPositive: true,
    },
  ];

  starratingdata: any = [
    {
      number: 5,
      value: 5,
      total: 51,
    },
    {
      number: 4,
      value: 1.5,
      total: 2,
    },
    {
      number: 3,
      value: 0,
      total: 0,
    },
    {
      number: 2,
      value: 1.5,
      total: 1,
    },
    {
      number: 1,
      value: 0,
      total: 0,
    },
  ];

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

  constructor(private privateServices: PrivateServices, private router:Router, private commonService: CommonService, private layoutService: LayoutService, private errorHandler: ErrorHandlerService) {
    this.totalReview.totalReviews = 0;
    this.totalReview.totalReviewBefore = 0;
    this.totalReview.totalReviewDifference = 0;
    this.overAllTotalReview = 0;
    this.endDate = this.getFormattedDate(new Date());
    const date = new Date();
    date.setDate(date.getDate() - 13);
    this.startDate = this.getFormattedDate(date);
    this.isDashboardCalled = false;
    this.subscription = new Subscription();
    this.profilesData = this.commonService.GetLocalStorage('profileDetails');
    if (this.profilesData !== "" || this.profilesData) {
      this.profileDetails = JSON.parse(this.profilesData);
    }
  }

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 4;
    } else {
      this.breakpoint = 1;
      // this.platformData.unshift(this.updatedData);
    }
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.userType = this.commonService.GetLocalStorage('userType');
    this.profileId = this.commonService.GetLocalStorage('profileId');
    if (this.profileId !== "" && !this.isDashboardCalled) {
      this.GetDashboardDetails();
      this.commonService.isDashboardCalled = true;
    }
    this.subscription = this.commonService.$dropdownValueSubject.subscribe(value => {
      this.profileId = value;
      if (this.profileId && this.commonService.isProfileListAPICalled && !this.commonService.isDashboardCalled) {
        this.commonService.AddLocalStorage('profileId', this.profileId)
        this.GetDashboardDetails();
        this.commonService.isDashboardCalled = true;
      }
    });

    // Check SMS limit
    if (this.profileDetails.Usedsmspercentage > 90) {
      this.notificationModel1 = true;
      this.smsCredit = true;
    }

    // Check Email limit 
    if (this.profileDetails.UsedEmailpercentage > 90) {
      this.notificationModel1 = true;
      this.emailCredit = true;
    }

    // Showing warning notification based on condition 
    if (this.profileDetails.AllowSMS === true || this.userType === 'Agency User') {
      this.warningModel = true;
    }
  }

  /**
   *  Close notification model
   */
  closeCard(event: Event) {
    const target = (event.target as HTMLElement).closest('mat-card');
    if (target) {
      (target as HTMLElement).style.display = 'none';
    }
  }

  /**
   *  Redirect on add on purchase screen
   */
  redirectAddOn() {
    this.router.navigate(
      ['/admin'],
      { queryParams: { addOnPath: 'addOnPurchase' } }
    );
  }

  /**
*  Redirect to twilio integration screen
*/
  redirectToTwilio() {
    this.router.navigate(
      ['/admin'],
      { queryParams: { twilioPath: 'twiliointegration' } }
    );
  }

  ngAfterViewInit(): void {
    const start = moment().subtract(13, 'days');
    const end = moment();

    /**
     * Function: Used as a callback for the date range picker to update the displayed date range whenever the selected range changes.
     * @param start The start date of the selected date range.
     * @param end The end date of the selected date range.
     */
    function updateDateRangeText(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 14 Days': [moment().subtract(13, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, updateDateRangeText);

    updateDateRangeText(start, end);

    $('#reportrange').on('apply.daterangepicker', (event, picker) => {
      this.startDate = this.getMomentFormattedDate(picker.startDate);
      this.endDate = this.getMomentFormattedDate(picker.endDate);
      this.profileId = this.commonService.GetLocalStorage('profileId');
      if (this.profileId !== '' && this.isDashboardCalled) {
        this.GetDashboardDetails();
      }
    });

  $('#reportrange').on('show.daterangepicker', () => {
    $('.app-sidenav-content').css('overflow', 'hidden'); // Disable scrolling when dropdown is opened
  });

  $('#reportrange').on('hide.daterangepicker', () => {
    $('.app-sidenav-content').css('overflow', 'auto'); // Enable scrolling when dropdown is closed
  });
  }

  /**
    * Function: Converts the moment object into string format.
    * @param moment object is passed for string conversion
    * @returns date in string format
    */
  getMomentFormattedDate(date: moment.Moment): string {
    return date.format('MM/DD/YYYY');;
  }

  /**
   * Function: Converts the date into string format.
   * @param date object is passed for string conversion
   * @returns date in string format
   */
  getFormattedDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }


  /**
   * Function: Gets dashboard data for selected profile.
   */
  GetDashboardDetails(): void {
  
  }

  OnDestroy(): void {
    this.commonService.$DashboardRefresh.unsubscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    breakpoints: {
      200: {
        slidesPerView: 1.1,
        spaceBetween: 8,
        slidesPerGroup: 1,
      },
      599: {
        slidesPerView: 2,
        spaceBetween: 15,
        slidesPerGroup: 2,
      },
      968: {
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 3,
        loop: false,
      },
      1124: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 5,
        loop: false,
      },
    },
    loop: false,
  };

  configplatform: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    breakpoints: {
      620: {
        slidesPerView: 2,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
      960: {
        slidesPerView: 2,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },

    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  };

  cardData = [
    {
      id: 0,
      title: 'Connect your review sites',
      discription:
        'Monitor Google, Facebook, and other sites by connecting them.',
      icon: 'arrow_forward',
      selected: this.HasConnectedReviewSites,
    },
    {
      id: 1,
      title: 'Invite Customer',
      discription:
        'Your Grab Review Team is ready to go, know a few friends or customer who’d like to explore review with you?',
      icon: 'arrow_forward',
      selected: this.HasInvitedCustomer,
    },
    {
      id: 2,
      title: 'Your Report',
      discription: 'Check out my review, and thank you for the rating.',
      icon: 'arrow_forward',
      selected: this.HasReport,
    },
    {
      id: 3,
      title: 'Integrations',
      discription: 'Working together with another company.',
      icon: 'arrow_forward',
      selected: this.HasConnectedIntegrations,
    },
  ];
  selectedCard?: number;

  selectItem = (id: number): void => {
    this.selectedCard = id;
  };

  platformData = [
    // {
    //   id: 0,
    //   title: 'All Reviews',
    //   discription: '45 -> 59',
    //   subDis:"14",
    //   icon: 'arrow_forward',
    //   img: 'assets/images/OverAll.svg',
    // },
    {
      id: 1,
      title: 'Google',
      discription: '45 -> 59',
      subDis: '14',
      img: 'assets/images/Google.svg',
    },
    {
      id: 2,
      title: 'Facebook',
      discription: '45 -> 59',
      subDis: '14',
      img: 'assets/images/Facebook.svg',
    },
    {
      id: 3,
      title: 'Alternativeto',
      discription: '45 -> 59',
      subDis: '14',
      img: 'assets/images/Alternativete.svg',
    },
    {
      id: 4,
      title: 'Airbnb',
      discription: '45 -> 59',
      subDis: '14',

      img: 'assets/images/Airbnb.svg',
    },
    {
      id: 5,
      title: 'Facebook',
      discription: '45 -> 59',
      subDis: '14',

      img: 'assets/images/Facebook.svg',
    },
    {
      id: 6,
      title: 'Alternativeto',
      discription: '45 -> 59 ',
      subDis: '14',
      img: 'assets/images/Alternativete.svg',
    },
    {
      id: 7,
      title: 'Airbnb',
      discription: '45 -> 59',
      subDis: '14',
      img: 'assets/images/Airbnb.svg',
    },
  ];


  links = [
    { title: 'First', tabs: 'app' },
    { title: 'Second' },
    { title: 'Third' },
  ];
  selectedPlatformData?: number = 0;
  selectPlatform = (id: number): void => {
    this.selectedPlatformData = id;
  };

  updatedData = {
    id: 10,
    title: 'All Reviews',
    discription: '45 -> 59',
    subDis: '14',
    img: 'assets/images/overalldesignnew.svg ',
  };
  allPlatForm = [this.updatedData, ...this.platformData];



  disableViewMore: any =
    this.showPlatformReviewCount >= this.platformData.length ? true : false;



  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 4;
    } else {
      this.breakpoint = 1;
      // this.platformData.unshift(this.updatedData);
    }

    this.screenSize = this.layoutService.screenSize;
  }

  convertPercentage(count, total) {
    if (count == 0) {
      return 0;
    } else {
      let tempVal = (total / count) * 100;
      if (tempVal >= 100) {
        return 100;
      } else {
        return tempVal;
      }
    }
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

    let avgSentimentRating = +this.model.data.AvgSentimentRating;
    powerGauge.render(avgSentimentRating);
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
}
