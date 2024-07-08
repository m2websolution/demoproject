import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSetting2Component } from './review-screen-setting2.component';

describe('ReviewScreenSetting2Component', () => {
  let component: ReviewScreenSetting2Component;
  let fixture: ComponentFixture<ReviewScreenSetting2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSetting2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSetting2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
