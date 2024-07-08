import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroReviewModalComponent } from './micro-review-modal.component';

describe('MicroReviewModalComponent', () => {
  let component: MicroReviewModalComponent;
  let fixture: ComponentFixture<MicroReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroReviewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
