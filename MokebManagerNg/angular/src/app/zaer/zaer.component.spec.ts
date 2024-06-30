import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaerComponent } from './zaer.component';

describe('ZaerComponent', () => {
  let component: ZaerComponent;
  let fixture: ComponentFixture<ZaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZaerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
