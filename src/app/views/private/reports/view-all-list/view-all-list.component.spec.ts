import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllListComponent } from './view-all-list.component';

describe('ViewAllListComponent', () => {
  let component: ViewAllListComponent;
  let fixture: ComponentFixture<ViewAllListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
