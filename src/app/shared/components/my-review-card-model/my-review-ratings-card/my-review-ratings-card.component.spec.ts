import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReviewRatingsCardComponent } from './my-review-ratings-card.component';

describe('MyReviewRatingsCardComponent', () => {
  let component: MyReviewRatingsCardComponent;
  let fixture: ComponentFixture<MyReviewRatingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReviewRatingsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReviewRatingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
