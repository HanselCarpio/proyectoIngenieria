import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenContratoComponent } from './resumen-contrato.component';

describe('ResumenContratoComponent', () => {
  let component: ResumenContratoComponent;
  let fixture: ComponentFixture<ResumenContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
