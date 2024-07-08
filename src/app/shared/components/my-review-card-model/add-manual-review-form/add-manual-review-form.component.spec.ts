import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualReviewFormComponent } from './add-manual-review-form.component';

describe('AddManualReviewFormComponent', () => {
  let component: AddManualReviewFormComponent;
  let fixture: ComponentFixture<AddManualReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualReviewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
