import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Gender, MokebService } from '@proxy';
import { CreateUpdateMokebDto } from '@proxy/domain/create-update-dtos';
import { zip } from 'rxjs';

@Component({
  selector: 'app-create-update-mokeb',
  templateUrl: './create-update-mokeb.component.html',
  styleUrl: './create-update-mokeb.component.scss',
})
export class CreateUpdateMokebComponent {
  mokebId: string | null = null;
  mokebForm: FormGroup;
  genders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mokebService: MokebService,
    private localizationService: LocalizationService
  ) {
    this.mokebForm = this.fb.group({
      name: [''],
      gender: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.mokebId = this.route.snapshot.paramMap.get('id');
    this.localizationService.get('::Female').subscribe(female => {
      this.localizationService.get('::Male').subscribe(male => {
        this.genders = [
          { label: male, value: Gender.Male },
          { label: female, value: Gender.Female },
        ];
      });
    });

    if (this.mokebId !== null) {
      this.mokebService.get(this.mokebId).subscribe(x => {
        this.mokebForm.setValue({
          name: x.name,
          gender: x.gender,
          capacity: x.capacity,
        });
      });
    }
  }

  onSubmit() {
    if (this.mokebForm.invalid) return;

    const formValue: CreateUpdateMokebDto = this.mokebForm.value as CreateUpdateMokebDto;

    if (this.mokebId === null) {
      this.mokebService.create(formValue).subscribe(x => console.log(x.id));
    }
    if (this.mokebId !== null) {
      this.mokebService.update(this.mokebId, formValue).subscribe(x => console.log(x.id));
    }
  }
}
