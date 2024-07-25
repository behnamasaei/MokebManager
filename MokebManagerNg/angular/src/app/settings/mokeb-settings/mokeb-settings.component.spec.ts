import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MokebSettingsComponent } from './mokeb-settings.component';

describe('MokebSettingsComponent', () => {
  let component: MokebSettingsComponent;
  let fixture: ComponentFixture<MokebSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MokebSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MokebSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
