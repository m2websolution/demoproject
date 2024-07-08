import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsJobberComponent } from './integrations-jobber.component';

describe('IntegrationsJobberComponent', () => {
  let component: IntegrationsJobberComponent;
  let fixture: ComponentFixture<IntegrationsJobberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsJobberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationsJobberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
