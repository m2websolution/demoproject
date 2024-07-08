import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingCardComponent } from './review-rating-card.component';

describe('ReviewRatingCardComponent', () => {
  let component: ReviewRatingCardComponent;
  let fixture: ComponentFixture<ReviewRatingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRatingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRatingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
