import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponyProfileComponent } from './compony-profile.component';

describe('ComponyProfileComponent', () => {
  let component: ComponyProfileComponent;
  let fixture: ComponentFixture<ComponyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
