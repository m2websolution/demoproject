import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCollectorModalComponent } from './review-collector-modal.component';

describe('ReviewCollectorModalComponent', () => {
  let component: ReviewCollectorModalComponent;
  let fixture: ComponentFixture<ReviewCollectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCollectorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCollectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
