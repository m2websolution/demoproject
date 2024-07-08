import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeQrCodeComponent } from './employee-qr-code.component';

describe('EmployeeQrCodeComponent', () => {
  let component: EmployeeQrCodeComponent;
  let fixture: ComponentFixture<EmployeeQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeQrCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
