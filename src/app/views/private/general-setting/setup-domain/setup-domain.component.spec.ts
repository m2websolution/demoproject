import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDomainComponent } from './setup-domain.component';

describe('SetupDomainComponent', () => {
  let component: SetupDomainComponent;
  let fixture: ComponentFixture<SetupDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDomainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
