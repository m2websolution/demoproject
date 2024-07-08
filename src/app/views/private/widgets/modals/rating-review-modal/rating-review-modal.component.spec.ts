import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReviewModalComponent } from './rating-review-modal.component';

describe('RatingReviewModalComponent', () => {
  let component: RatingReviewModalComponent;
  let fixture: ComponentFixture<RatingReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingReviewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
