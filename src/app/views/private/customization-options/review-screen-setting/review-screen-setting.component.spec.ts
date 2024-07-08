import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSettingComponent } from './review-screen-setting.component';

describe('ReviewScreenSettingComponent', () => {
  let component: ReviewScreenSettingComponent;
  let fixture: ComponentFixture<ReviewScreenSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
