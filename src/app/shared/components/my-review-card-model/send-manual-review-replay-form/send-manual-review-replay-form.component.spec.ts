import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendManualReviewReplayFormComponent } from './send-manual-review-replay-form.component';

describe('SendManualReviewReplayFormComponent', () => {
  let component: SendManualReviewReplayFormComponent;
  let fixture: ComponentFixture<SendManualReviewReplayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendManualReviewReplayFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendManualReviewReplayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
