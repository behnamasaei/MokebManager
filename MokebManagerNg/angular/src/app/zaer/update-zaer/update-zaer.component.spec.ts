import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateZaerComponent } from './update-zaer.component';

describe('UpdateZaerComponent', () => {
  let component: UpdateZaerComponent;
  let fixture: ComponentFixture<UpdateZaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateZaerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateZaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
