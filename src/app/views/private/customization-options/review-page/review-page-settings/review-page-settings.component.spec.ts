import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPageSettingsComponent } from './review-page-settings.component';

describe('ReviewPageSettingsComponent', () => {
  let component: ReviewPageSettingsComponent;
  let fixture: ComponentFixture<ReviewPageSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPageSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
