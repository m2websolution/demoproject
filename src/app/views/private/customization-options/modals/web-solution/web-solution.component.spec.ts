import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSolutionComponent } from './web-solution.component';

describe('WebSolutionComponent', () => {
  let component: WebSolutionComponent;
  let fixture: ComponentFixture<WebSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
