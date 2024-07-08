import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingReviewModalComponent } from './floating-review-modal.component';

describe('FloatingReviewModalComponent', () => {
  let component: FloatingReviewModalComponent;
  let fixture: ComponentFixture<FloatingReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingReviewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
