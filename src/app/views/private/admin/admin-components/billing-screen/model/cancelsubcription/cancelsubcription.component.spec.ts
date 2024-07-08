import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelsubcriptionComponent } from './cancelsubcription.component';

describe('CancelsubcriptionComponent', () => {
  let component: CancelsubcriptionComponent;
  let fixture: ComponentFixture<CancelsubcriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelsubcriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelsubcriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
