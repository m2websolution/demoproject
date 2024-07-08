import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualReviewComponent } from './add-manual-review.component';

describe('AddManualReviewComponent', () => {
  let component: AddManualReviewComponent;
  let fixture: ComponentFixture<AddManualReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
