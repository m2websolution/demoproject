import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandInformationComponent } from './brand-information.component';

describe('BrandInformationComponent', () => {
  let component: BrandInformationComponent;
  let fixture: ComponentFixture<BrandInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
