import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexyComponent } from './sexy.component';

describe('SexyComponent', () => {
  let component: SexyComponent;
  let fixture: ComponentFixture<SexyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SexyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SexyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
