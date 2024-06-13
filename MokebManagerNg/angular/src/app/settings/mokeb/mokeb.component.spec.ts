import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MokebComponent } from './mokeb.component';

describe('MokebComponent', () => {
  let component: MokebComponent;
  let fixture: ComponentFixture<MokebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MokebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MokebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
