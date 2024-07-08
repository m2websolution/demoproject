import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsDetailComponent } from './integrations-detail.component';

describe('IntegrationsDetailComponent', () => {
  let component: IntegrationsDetailComponent;
  let fixture: ComponentFixture<IntegrationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
