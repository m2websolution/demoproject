import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateConfirmationModelComponent } from './card-update-confirmation-model.component';

describe('CardUpdateConfirmationModelComponent', () => {
  let component: CardUpdateConfirmationModelComponent;
  let fixture: ComponentFixture<CardUpdateConfirmationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUpdateConfirmationModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUpdateConfirmationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
