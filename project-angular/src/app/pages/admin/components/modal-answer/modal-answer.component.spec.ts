import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnswerComponent } from './modal-answer.component';

describe('ModalAnswerComponent', () => {
  let component: ModalAnswerComponent;
  let fixture: ComponentFixture<ModalAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
