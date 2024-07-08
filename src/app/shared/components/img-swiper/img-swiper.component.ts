import { Component } from '@angular/core';
import { slideAnimation } from './slide.animation';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.css'],
  animations: [slideAnimation],
})
export class ImgSwiperComponent {
  currentIndex = 0;
  slides = [
    { image: 'assets/images/signup-slider-1.svg', description: 'Image 00' },
    { image: 'assets/images/signup-slider-2.svg', description: 'Image 01' },
  ];

  constructor() {
    this.preloadImages();
  }

  preloadImages() {
    this.slides.forEach((slide) => {
      new Image().src = slide.image;
    });
  }

  setCurrentSlideIndex(index: any) {
    this.currentIndex = index;
  }

  isCurrentSlideIndex(index: any) {
    return this.currentIndex === index;
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex < this.slides.length - 1 ? ++this.currentIndex : 0;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex > 0 ? --this.currentIndex : this.slides.length - 1;
  }

  ngOnInit() {
    setInterval(() => {
      this.currentIndex =
        this.currentIndex > 0 ? --this.currentIndex : this.slides.length - 1;
    }, 5000);
  }
}
