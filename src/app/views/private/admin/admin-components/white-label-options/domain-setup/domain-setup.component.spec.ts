import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainSetupComponent } from './domain-setup.component';

describe('DomainSetupComponent', () => {
  let component: DomainSetupComponent;
  let fixture: ComponentFixture<DomainSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
