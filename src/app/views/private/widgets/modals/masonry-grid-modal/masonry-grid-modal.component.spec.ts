import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryGridModalComponent } from './masonry-grid-modal.component';

describe('MasonryGridModalComponent', () => {
  let component: MasonryGridModalComponent;
  let fixture: ComponentFixture<MasonryGridModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasonryGridModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasonryGridModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
