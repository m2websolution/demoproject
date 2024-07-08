import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisConnectedPlatformModelComponent } from './dis-connected-platform-model.component';

describe('DisConnectedPlatformModelComponent', () => {
  let component: DisConnectedPlatformModelComponent;
  let fixture: ComponentFixture<DisConnectedPlatformModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisConnectedPlatformModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisConnectedPlatformModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
