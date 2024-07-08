import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReviewTemplateComponent } from './get-review-template.component';

describe('GetReviewTemplateComponent', () => {
  let component: GetReviewTemplateComponent;
  let fixture: ComponentFixture<GetReviewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReviewTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetReviewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
