import { LocalizationService } from '@abp/ng.core';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CreateZaerDto,
  EntryExitZaerService,
  FileService,
  Gender,
  MokebCapacityDto,
  MokebService,
  UpdateZaerDto,
  ZaerService,
} from '@proxy';
import { CreateUpdateEntryExitZaerDto } from '@proxy/domain/create-update-dtos';
import { MokebDto } from '@proxy/domain/dtos';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-update-zaer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-zaer.component.html',
  styleUrls: ['./update-zaer.component.scss'],
  providers: [MessageService],
})
export class UpdateZaerComponent implements OnInit {
  zaerId: string | null = null;
  form: FormGroup;
  formData = new FormData();
  genders: any[] = [];
  mokebsDropDown: any[] = [];
  mokebs: MokebDto[] = [];
  allProvinces: any[];
  citiesOfProvince: any[];
  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private mokebService: MokebService,
    private entryExitZaerService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.zaerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadLocalizationData();
    this.loadProvincesData();
    this.getMokebsInformation();
    this.loadZaerData();
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: [''],
      family: [''],
      gender: ['', Validators.required],
      image: [null],
      passportNo: ['', Validators.required],
      mokebId: ['', Validators.required],
      phoneNumber: [''],
      state: [''],
      city: [''],
      address: [''],
    });
  }

  private loadLocalizationData() {
    this.genders = [
      { label: 'آقا', value: Gender.Male },
      { label: 'خانم', value: Gender.Female },
    ];
  }

  private loadProvincesData() {
    const iranCity = require('iran-city');
    this.allProvinces = iranCity.allProvinces();
  }

  private loadZaerData() {
    if (this.zaerId) {
      this.zaerService.get(this.zaerId).subscribe(zaer => {
        const province = this.allProvinces.filter(x => x.name === zaer.state)[0];
        const city = this.citiesOfProvince?.filter(x => x.name === zaer.city)[0];
        this.form.patchValue({
          name: zaer.name,
          gender: zaer.gender,
          passportNo: zaer.passportNo,
          mokebId: zaer.mokebId,
          phoneNumber: zaer.phoneNumber,
          state: province,
          city: city,
          address: zaer.address,
        });
      });
    }
  }

  getMokebsInformation() {
    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
      this.mokebService.getAllList().subscribe(mokeb => {
        this.mokebs = mokeb.items;
        this.mokebsDropDown = mokeb.items.map(item => ({
          label: `${item.name} - ظرفیت خالی امشب : ${
            mokebCapacity.find(x => x.mokebId === item.id).freeCapacityToNight
          }`,
          value: item.id,
        }));
      });
    });
  }

  changeGender(event: any) {
    const genderValue = event.value;
    const selectedItems = this.mokebs.filter(item => item.gender === genderValue);

    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
      this.mokebsDropDown = selectedItems
        .map(item => {
          const capacity = mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight || 0;
          return {
            label: `${item.name} - ظرفیت خالی امشب: ${capacity}`,
            value: item.id,
            freeCapacityToNight: capacity,
          };
        })
        .filter(item => item.freeCapacityToNight > 0)
        .map(item => ({
          label: item.label,
          value: item.value,
        }));
    });
  }

  onFileSelected(event: any) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      this.form.get('image')?.setValue(file);
      this.formData.append('image', file);
    }
  }

  onSubmit() {
    const formValue: UpdateZaerDto | any = { ...this.form.value };
    formValue.city = formValue.city?.name ?? '';
    formValue.state = formValue.state?.name ?? '';

    if (formValue.image) {
      const formData = new FormData();
      formData.append('File', formValue.image, formValue.image.name);
      formData.append('Name', formValue.image.name);

      this.fileService.saveBlobStream(formData).subscribe(file => {
        formValue.imageFileName = file;
        this.updateZaer(formValue);
      });
    } else {
      this.updateZaer(formValue);
    }
  }

  private updateZaer(formValue: UpdateZaerDto) {
    if (this.zaerId) {
      this.zaerService.update(this.zaerId, formValue).subscribe(() => {
        this.showSuccessMessage();
      });
    }
  }

  private resetForm() {
    this.form.reset();
    this.fileUpload.clear();
  }

  private showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Success',
      life: 1000,
    });
  }

  getCitiesOfProvince(event: any) {
    const iranCity = require('iran-city');
    this.citiesOfProvince = iranCity.citiesOfProvince(event.value.id);
  }
}
