import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from '@abp/ng.core';
import { Gender } from '@proxy/gender.enum';

@Component({
  selector: 'app-new-zaer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-zaer.component.html',
  styleUrl: './new-zaer.component.scss',
})
export class NewZaerComponent {

  form: FormGroup;
  genders: any[] = [];


  constructor(private fb: FormBuilder, private localizationService: LocalizationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      gender: [null, Validators.required],
      image: [null, Validators.required],
      passportNo: ['', Validators.required],
      mokebId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.localizationService.get('::Female').subscribe(female => {
      this.localizationService.get('::Male').subscribe(male => {
        this.genders = [
          { label: male, value: Gender.Male },
          { label: female, value: Gender.Female },
        ];
      });
    });
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    this.form.patchValue({ image: file });
  }

  onSubmit(){

  }
}
