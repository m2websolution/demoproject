import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCompanyProfileComponent } from './add-new-company-profile.component';

describe('AddNewCompanyProfileComponent', () => {
  let component: AddNewCompanyProfileComponent;
  let fixture: ComponentFixture<AddNewCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCompanyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
