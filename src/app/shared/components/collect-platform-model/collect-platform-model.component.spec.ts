import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPlatformModelComponent } from './collect-platform-model.component';

describe('CollectPlatformModelComponent', () => {
  let component: CollectPlatformModelComponent;
  let fixture: ComponentFixture<CollectPlatformModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPlatformModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectPlatformModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
