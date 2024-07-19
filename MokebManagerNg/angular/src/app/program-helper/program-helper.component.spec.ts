import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramHelperComponent } from './program-helper.component';

describe('ProgramHelperComponent', () => {
  let component: ProgramHelperComponent;
  let fixture: ComponentFixture<ProgramHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
