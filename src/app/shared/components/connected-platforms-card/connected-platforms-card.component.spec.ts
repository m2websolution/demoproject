import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedPlatformsCardComponent } from './connected-platforms-card.component';

describe('ConnectedPlatformsCardComponent', () => {
  let component: ConnectedPlatformsCardComponent;
  let fixture: ComponentFixture<ConnectedPlatformsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedPlatformsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedPlatformsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
