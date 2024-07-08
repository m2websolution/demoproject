import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwilioIntegrationComponent } from './twilio-integration.component';

describe('TwilioIntegrationComponent', () => {
  let component: TwilioIntegrationComponent;
  let fixture: ComponentFixture<TwilioIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwilioIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwilioIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
