import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReviewActivitiesFormComponent } from './my-review-activities-form.component';

describe('MyReviewActivitiesFormComponent', () => {
  let component: MyReviewActivitiesFormComponent;
  let fixture: ComponentFixture<MyReviewActivitiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReviewActivitiesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReviewActivitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
