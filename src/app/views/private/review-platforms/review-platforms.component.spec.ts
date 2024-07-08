import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPlatformsComponent } from './review-platforms.component';

describe('ReviewPlatformsComponent', () => {
  let component: ReviewPlatformsComponent;
  let fixture: ComponentFixture<ReviewPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPlatformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
