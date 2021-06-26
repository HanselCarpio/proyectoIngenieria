import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultComponent } from './modal-consult.component';

describe('ModalConsultComponent', () => {
  let component: ModalConsultComponent;
  let fixture: ComponentFixture<ModalConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
