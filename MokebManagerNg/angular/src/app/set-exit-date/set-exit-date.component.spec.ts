import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetExitDateComponent } from './set-exit-date.component';

describe('SetExitDateComponent', () => {
  let component: SetExitDateComponent;
  let fixture: ComponentFixture<SetExitDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetExitDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetExitDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
