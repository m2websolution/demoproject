import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfilesComponent } from './company-profiles.component';

describe('CompanyProfilesComponent', () => {
  let component: CompanyProfilesComponent;
  let fixture: ComponentFixture<CompanyProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
