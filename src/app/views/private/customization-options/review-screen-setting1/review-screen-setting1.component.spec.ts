import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSetting1Component } from './review-screen-setting1.component';

describe('ReviewScreenSetting1Component', () => {
  let component: ReviewScreenSetting1Component;
  let fixture: ComponentFixture<ReviewScreenSetting1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSetting1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSetting1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
