import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquetacionComponent } from './maquetacion.component';

describe('MaquetacionComponent', () => {
  let component: MaquetacionComponent;
  let fixture: ComponentFixture<MaquetacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaquetacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaquetacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
