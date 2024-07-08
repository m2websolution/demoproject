import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSetting3Component } from './review-screen-setting3.component';

describe('ReviewScreenSetting3Component', () => {
  let component: ReviewScreenSetting3Component;
  let fixture: ComponentFixture<ReviewScreenSetting3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSetting3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSetting3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
