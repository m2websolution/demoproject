import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSwiperComponent } from './img-swiper.component';

describe('ImgSwiperComponent', () => {
  let component: ImgSwiperComponent;
  let fixture: ComponentFixture<ImgSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgSwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
