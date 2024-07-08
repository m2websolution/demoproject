import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFeedbackWorkflowComponent } from './private-feedback-workflow.component';

describe('PrivateFeedbackWorkflowComponent', () => {
  let component: PrivateFeedbackWorkflowComponent;
  let fixture: ComponentFixture<PrivateFeedbackWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFeedbackWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateFeedbackWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
