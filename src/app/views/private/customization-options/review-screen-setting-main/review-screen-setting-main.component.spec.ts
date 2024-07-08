import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSettingMainComponent } from './review-screen-setting-main.component';

describe('ReviewScreenSettingMainComponent', () => {
  let component: ReviewScreenSettingMainComponent;
  let fixture: ComponentFixture<ReviewScreenSettingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSettingMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSettingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
