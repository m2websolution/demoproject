import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsZapierComponent } from './integrations-zapier.component';

describe('IntegrationsZapierComponent', () => {
  let component: IntegrationsZapierComponent;
  let fixture: ComponentFixture<IntegrationsZapierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsZapierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationsZapierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
