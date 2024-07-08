import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewScreenSettingHeaderComponent } from './review-screen-setting-header.component';

describe('ReviewScreenSettingHeaderComponent', () => {
  let component: ReviewScreenSettingHeaderComponent;
  let fixture: ComponentFixture<ReviewScreenSettingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewScreenSettingHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewScreenSettingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
