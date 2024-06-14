import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMokebComponent } from './create-update-mokeb.component';

describe('CreateUpdateMokebComponent', () => {
  let component: CreateUpdateMokebComponent;
  let fixture: ComponentFixture<CreateUpdateMokebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateMokebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateMokebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
