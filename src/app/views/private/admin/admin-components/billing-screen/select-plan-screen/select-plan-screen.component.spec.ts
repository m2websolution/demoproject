import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlanScreenComponent } from './select-plan-screen.component';

describe('SelectPlanScreenComponent', () => {
  let component: SelectPlanScreenComponent;
  let fixture: ComponentFixture<SelectPlanScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPlanScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlanScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
