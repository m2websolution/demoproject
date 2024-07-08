import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteWidgetsComponent } from './website-widgets.component';

describe('WebsiteWidgetsComponent', () => {
  let component: WebsiteWidgetsComponent;
  let fixture: ComponentFixture<WebsiteWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
