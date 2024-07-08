import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCustomizeComponent } from './widget-customize.component';

describe('WidgetCustomizeComponent', () => {
  let component: WidgetCustomizeComponent;
  let fixture: ComponentFixture<WidgetCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetCustomizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
