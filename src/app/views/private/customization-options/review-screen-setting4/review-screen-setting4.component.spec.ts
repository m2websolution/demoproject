import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSetting4Component } from './review-screen-setting4.component';

describe('ReviewScreenSetting4Component', () => {
  let component: ReviewScreenSetting4Component;
  let fixture: ComponentFixture<ReviewScreenSetting4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSetting4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSetting4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
