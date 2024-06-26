import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicotaComponent } from './ricota.component';

describe('RicotaComponent', () => {
  let component: RicotaComponent;
  let fixture: ComponentFixture<RicotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RicotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
