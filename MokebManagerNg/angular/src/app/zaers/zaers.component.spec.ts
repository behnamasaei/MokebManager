import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaersComponent } from './zaers.component';

describe('ZaersComponent', () => {
  let component: ZaersComponent;
  let fixture: ComponentFixture<ZaersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZaersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZaersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
