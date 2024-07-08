import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedPlatformsComponent } from './connected-platforms.component';

describe('ConnectedPlatformsComponent', () => {
  let component: ConnectedPlatformsComponent;
  let fixture: ComponentFixture<ConnectedPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedPlatformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
