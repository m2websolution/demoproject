import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReviewWorkflowComponent } from './public-review-workflow.component';

describe('PublicReviewWorkflowComponent', () => {
  let component: PublicReviewWorkflowComponent;
  let fixture: ComponentFixture<PublicReviewWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicReviewWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReviewWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
