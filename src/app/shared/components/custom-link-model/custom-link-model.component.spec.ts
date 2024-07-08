import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLinkModelComponent } from './custom-link-model.component';

describe('CustomLinkModelComponent', () => {
  let component: CustomLinkModelComponent;
  let fixture: ComponentFixture<CustomLinkModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLinkModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLinkModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
