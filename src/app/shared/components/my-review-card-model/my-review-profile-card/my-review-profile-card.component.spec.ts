import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReviewProfileCardComponent } from './my-review-profile-card.component';

describe('MyReviewProfileCardComponent', () => {
  let component: MyReviewProfileCardComponent;
  let fixture: ComponentFixture<MyReviewProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReviewProfileCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReviewProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
