import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageAddonPurchaseComponent } from './usage-addon-purchase.component';

describe('UsageAddonPurchaseComponent', () => {
  let component: UsageAddonPurchaseComponent;
  let fixture: ComponentFixture<UsageAddonPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageAddonPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageAddonPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
