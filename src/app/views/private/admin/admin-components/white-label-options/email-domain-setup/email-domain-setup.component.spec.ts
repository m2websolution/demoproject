import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDomainSetupComponent } from './email-domain-setup.component';

describe('EmailDomainSetupComponent', () => {
  let component: EmailDomainSetupComponent;
  let fixture: ComponentFixture<EmailDomainSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDomainSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDomainSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
