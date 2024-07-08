import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFeedbackFormComponent } from './private-feedback-form.component';

describe('PrivateFeedbackFormComponent', () => {
  let component: PrivateFeedbackFormComponent;
  let fixture: ComponentFixture<PrivateFeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFeedbackFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
