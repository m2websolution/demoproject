import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalEmailCreditsComponent } from './additional-email-credits.component';

describe('AdditionalEmailCreditsComponent', () => {
  let component: AdditionalEmailCreditsComponent;
  let fixture: ComponentFixture<AdditionalEmailCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalEmailCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalEmailCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
