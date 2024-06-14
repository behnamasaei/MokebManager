import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZaerComponent } from './new-zaer.component';

describe('NewZaerComponent', () => {
  let component: NewZaerComponent;
  let fixture: ComponentFixture<NewZaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewZaerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewZaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
