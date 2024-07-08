import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUsageComponent } from './profile-usage.component';

describe('ProfileUsageComponent', () => {
  let component: ProfileUsageComponent;
  let fixture: ComponentFixture<ProfileUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
