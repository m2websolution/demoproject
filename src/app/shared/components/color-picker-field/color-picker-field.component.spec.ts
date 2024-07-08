import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerFieldComponent } from './color-picker-field.component';

describe('ColorPickerFieldComponent', () => {
  let component: ColorPickerFieldComponent;
  let fixture: ComponentFixture<ColorPickerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPickerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
