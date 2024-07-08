import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareReviewCardComponent } from './share-review-card.component';

describe('ShareReviewCardComponent', () => {
  let component: ShareReviewCardComponent;
  let fixture: ComponentFixture<ShareReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareReviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
