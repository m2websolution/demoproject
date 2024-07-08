import { NgModule } from '@angular/core';
import { SharedMaterialModule } from './shared-material.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxOtpInputModule } from 'ngx-otp-input';

@NgModule({
  declarations: [],
  imports: [SharedMaterialModule, NgImageSliderModule, NgxOtpInputModule],
  exports: [SharedMaterialModule, NgxUsefulSwiperModule, NgImageSliderModule],
})
export class SharedModule {}
