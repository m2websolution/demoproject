import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformReviewCardComponent } from './platform-review-card.component';

describe('PlatformReviewCardComponent', () => {
  let component: PlatformReviewCardComponent;
  let fixture: ComponentFixture<PlatformReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformReviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
