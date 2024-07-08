import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusModalComponent } from './payment-status-modal.component';

describe('PaymentStatusModalComponent', () => {
  let component: PaymentStatusModalComponent;
  let fixture: ComponentFixture<PaymentStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
