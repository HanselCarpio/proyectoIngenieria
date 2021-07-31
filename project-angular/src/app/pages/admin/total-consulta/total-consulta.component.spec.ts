import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalConsultaComponent } from './total-consulta.component';

describe('TotalConsultaComponent', () => {
  let component: TotalConsultaComponent;
  let fixture: ComponentFixture<TotalConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
