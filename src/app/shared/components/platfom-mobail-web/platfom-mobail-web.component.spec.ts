import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatfomMobailWebComponent } from './platfom-mobail-web.component';

describe('PlatfomMobailWebComponent', () => {
  let component: PlatfomMobailWebComponent;
  let fixture: ComponentFixture<PlatfomMobailWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatfomMobailWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatfomMobailWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
