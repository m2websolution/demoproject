import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-platfom-mobail-web',
  templateUrl: './platfom-mobail-web.component.html',
  styleUrls: ['./platfom-mobail-web.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlatfomMobailWebComponent {
  selectedPlatformData?: number = 0;
  showPlatformReviewCount: number = 4;
  breakpoint: any;
  screenSize: any;

  @Input()
  inputmodel: any | undefined;
  @Input() review: {
    totalReviewBefore: number,
    totalReviews: number,
    totalReviewDifference: number
  };

  constructor(private layoutService: LayoutService) { }
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

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 4;
    } else {
      this.breakpoint = 1;

      // this.platformData.unshift(this.updatedData);
    }
  }
  

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
}
