import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockEntryExitComponent } from './clock-entry-exit.component';

describe('ClockEntryExitComponent', () => {
  let component: ClockEntryExitComponent;
  let fixture: ComponentFixture<ClockEntryExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockEntryExitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockEntryExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
