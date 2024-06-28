import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZaerWithIdComponent } from './new-zaer-with-id.component';

describe('NewZaerWithIdComponent', () => {
  let component: NewZaerWithIdComponent;
  let fixture: ComponentFixture<NewZaerWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewZaerWithIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewZaerWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
