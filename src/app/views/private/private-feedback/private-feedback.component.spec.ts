import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFeedbackComponent } from './private-feedback.component';

describe('PrivateFeedbackComponent', () => {
  let component: PrivateFeedbackComponent;
  let fixture: ComponentFixture<PrivateFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
