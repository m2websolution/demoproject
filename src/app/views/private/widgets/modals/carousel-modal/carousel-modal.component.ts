import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, Inject, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-carousel-modal',
  templateUrl: './carousel-modal.component.html',
  styleUrls: ['./carousel-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('3000ms')),
      transition('visible => hidden', animate('3000ms')),
    ]),
  ],
})
export class CarouselModalComponent {
  state: any = {
    fontColor: '#000000',
    backColor: '#ffffff',
  };
  carousel: any;
  isShowJsCodeBlock: boolean;
  currentCardIndex: number;
  isAutoPlayCarousel: boolean;
  isDescriptionShowButton: boolean[];
  isDescriptionExpanded: boolean[];
  isDescriptionShowButtonAuto: boolean[];
  isDescriptionExpandedAuto: boolean[];
  @ViewChildren('descriptionElement') descriptionElements: QueryList<ElementRef>;
  @ViewChildren('descriptionElementAuto') descriptionElementsAuto: QueryList<ElementRef>;
  @ViewChild('previewCardsContainer') previewCardsContainer: ElementRef;
  descriptionElementHeights: number[];
  descriptionElementHeightsAuto: number[];

  // Given any to dialogData as it has multiple types of data
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private renderer: Renderer2) {
    this.isShowJsCodeBlock = false;
    this.currentCardIndex = 0;
    this.isAutoPlayCarousel = false;
    this.isDescriptionExpanded = [];
    this.isDescriptionShowButton = [];
    this.descriptionElementHeights = [];
    this.isDescriptionExpandedAuto = [];
    this.isDescriptionShowButtonAuto = [];
    this.descriptionElementHeightsAuto = [];
  }

  ngAfterViewInit(): void {
    // Subscribe to changes in the QueryList
    this.descriptionElements.changes.subscribe(() => {
      // Check if the QueryList is empty or not
      if (this.descriptionElements && this.descriptionElements.length > 0) {
        // Elements are available, proceed to get heights
        this.getDescriptionElementHeights();
      }
    });
  }

  /**
   * Function: Gets description element height
   */
  getDescriptionElementHeights(): void {
    // Reset the array
    this.descriptionElementHeights = [];
    this.descriptionElements.forEach((elementRef: ElementRef) => {
      const height = elementRef.nativeElement.offsetHeight;
      this.descriptionElementHeights.push(height);
    });
  }

  /**
   * Function: used to toggle read more/less button
   * @param index index number
   */
  toggleDescription(index: number): void {
    this.isDescriptionExpanded[index] = !this.isDescriptionExpanded[index];
  }

  /**
   * Function: used to toggle read more/less button when autoplay is true
   * @param index index number
   */
  toggleDescriptionAuto(index: number): void {
    this.isDescriptionExpandedAuto[index] = !this.isDescriptionExpandedAuto[index];
  }

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
  }

  onFieldValuesChanged(event: any) {
    this.state = event;
  }

  /**
   * Function: Fetches ReviewsForWidget response from child component
   * @param event ReviewsForWidget response
   */
  widgetDataChanged(event: any) {
    this.carousel = event;
  }

  /**
   * Function: to show/hide other blocks when js code block is displayed
   * @param event Boolean flag
   */
  showJsBlock(event: boolean): void {
    this.isShowJsCodeBlock = event;
  }

  /**
   * Function: Calls when clicks auto play toggle switch
   * @param event Boolean flag
   */
  autoPlayCarousel(event: boolean): void {
    this.isAutoPlayCarousel = event;
    this.currentCardIndex = 0;
    const totalCards = this.carousel.Reviews.length;
    if (this.isAutoPlayCarousel) {
      // Populate the description element heights when autoplay is enabled
      setTimeout(() => {
        this.descriptionElementHeightsAuto = [];
        this.descriptionElementsAuto.forEach((elementRef: ElementRef) => {
          const height = elementRef.nativeElement.offsetHeight;
          this.descriptionElementHeightsAuto.push(height);
        });
        setInterval(() => {
          if (this.currentCardIndex === totalCards) {
            this.currentCardIndex = -1;
          }
          this.currentCardIndex++;
          clearInterval(this.currentCardIndex);
        }, 6000);
      });
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
        slidesPerView: 1,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
      960: {
        slidesPerView: 1,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
      1366: {
        slidesPerView: 1,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
      1700: {
        slidesPerView: 1,
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
}
