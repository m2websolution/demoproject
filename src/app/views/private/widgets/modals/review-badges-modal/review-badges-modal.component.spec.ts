import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBadgesModalComponent } from './review-badges-modal.component';

describe('ReviewBadgesModalComponent', () => {
  let component: ReviewBadgesModalComponent;
  let fixture: ComponentFixture<ReviewBadgesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewBadgesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBadgesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
