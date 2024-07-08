import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedCustomerComponent } from './invited-customer.component';

describe('InvitedCustomerComponent', () => {
  let component: InvitedCustomerComponent;
  let fixture: ComponentFixture<InvitedCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitedCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
