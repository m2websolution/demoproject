import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailWidgetsComponent } from './email-widgets.component';

describe('EmailWidgetsComponent', () => {
  let component: EmailWidgetsComponent;
  let fixture: ComponentFixture<EmailWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
