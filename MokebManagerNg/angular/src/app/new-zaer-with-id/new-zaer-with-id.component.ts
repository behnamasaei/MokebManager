import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from '@abp/ng.core';
import { Gender } from '@proxy/gender.enum';
import {
  CreateZaerDto,
  EntryExitZaerService,
  FileService,
  MokebCapacityDto,
  MokebService,
  UploadFileDto,
  ZaerService,
} from '@proxy';
import { MokebDto } from '@proxy/domain/dtos';
import {
  CreateUpdateEntryExitZaerDto,
  CreateUpdateMokebDto,
} from '@proxy/domain/create-update-dtos';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-new-zaer-with-id',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-zaer-with-id.component.html',
  styleUrl: './new-zaer-with-id.component.scss',
  providers: [MessageService],
})
export class NewZaerWithIdComponent {
  form: FormGroup;
  formData: FormData;
  formEntryExitGroup: FormGroup;
  genders: any[] = [];
  mokebsDropDown: any[] = [];
  mokebs: MokebDto[] = [];
  entryExitOptions: any[] = [];
  mokebCapacityToNight: MokebCapacityDto[] = [];
  currentTime: string;
  scanResult: string | null = null;
  scanShow: boolean = false;
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
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.entryExitOptions = [
      { name: '1 شب', key: '1' },
      { name: '2 شب', key: '2' },
      { name: '3 شب', key: '3' },
    ];

    this.form = this.fb.group({
      name: [null],
      family: [null],
      gender: [null, Validators.required],
      image: [null],
      passportNo: [null, Validators.required],
      mokebId: [null, Validators.required],
      entryExitDate: [this.entryExitOptions[0], Validators.required],
      phoneNumber: [null],
      state: [null],
      city: [null],
      address: [null],
    });

    this.localizationService.get('::Female').subscribe(female => {
      this.localizationService.get('::Male').subscribe(male => {
        this.genders = [
          { label: male, value: Gender.Male },
          { label: female, value: Gender.Female },
        ];
      });
    });

    let iranCity = require('iran-city');
    this.allProvinces = iranCity.allProvinces();

    this.getMokebsInformation();
  }

  getMokebsInformation() {
    this.localizationService.get('::FreeCapacityToNight').subscribe(localization => {
      this.mokebService.getMokebCapacityToNight().subscribe(mokebCapacity => {
        this.mokebService.getAllList().subscribe(mokeb => {
          this.mokebs = mokeb.items;
          this.mokebsDropDown = mokeb.items.map(item => ({
            label: `${item.name} - ${localization} : ${
              mokebCapacity.find(x => x.mokebId === item.id).freeCapacityToNight
            }`,
            value: item.id,
          }));
        });
      });
    });
  }

  changeGender(event: any) {
    const genderValue = event.value;
    const selectedItems = this.mokebs.filter(item => item.gender === genderValue);

    this.localizationService.get('::FreeCapacityToNight').subscribe(localization => {
      this.mokebService.getMokebCapacityToNight().subscribe(mokebCapacity => {
        this.mokebsDropDown = selectedItems
          .map(item => {
            const capacity =
              mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight || 0;
            return {
              label: `${item.name} - ${localization}: ${capacity}`,
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
    });
  }

  onFileSelected(event) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      this.form.get('image').setValue(file);
      this.formData.append('image', file);
    }
  }

  onSubmit() {
    // const formValue: CreateUpdateZaerDto = this.form.value as CreateUpdateZaerDto;
    const formValue: CreateZaerDto | any = { ...this.form.value };
    formValue.city = formValue.city.name;
    formValue.state = formValue.state.name;
    formValue.id = this.scanResult;
    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.form.get('entryExitDate')?.value.key);

    if (formValue.image != null) {
      const formData = new FormData();
      formData.append('File', formValue.image, formValue.image.name);
      formData.append('Name', formValue.image.name); // Example of adding additional form data

      this.fileService.saveBlobStream(formData).subscribe(file => {
        formValue.imageFileName = file;
        this.zaerService.createNewWithId(formValue).subscribe(x => {
          const entryExitDate: CreateUpdateEntryExitZaerDto = {
            zaerId: x.id,
            entryDate: entryDate,
            exitDate: exitDate,
            mokebId: x.mokebId,
          };
          this.entryExitZaerService.create(entryExitDate).subscribe(x => {
            this.form.reset();
            this.fileUpload.clear();
            this.scanShow = false;
            this.scanResult = null;
            this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Success',
              life: 1000,
            });
          });
        });
      });
    } else {
      this.zaerService.createNewWithId(formValue).subscribe(x => {
        const entryExitDate: CreateUpdateEntryExitZaerDto = {
          zaerId: x.id,
          entryDate: entryDate,
          exitDate: exitDate,
          mokebId: x.mokebId,
        };
        this.entryExitZaerService.create(entryExitDate).subscribe(x => {
          this.form.reset();
          this.fileUpload.clear();
          this.scanShow = false;
          this.scanResult = null;

          this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success',
            life: 1000,
          });
        });
      });
    }
  }

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  getExitDate(exitDate: number): string {
    const exitDaysAfter = moment.utc().add(exitDate, 'days').format('YYYY-MM-DDT11:00:00.000[Z]'); // Two days after current UTC date

    return exitDaysAfter;
  }

  handleScanSuccess(result: string): void {
    if (this.isValidGuid(result)) {
      this.scanResult = result;
      this.scanShow = false;
    }
  }

  isValidGuid(guid: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(guid);
  }

  getCitiesOfProvice(event) {
    let iranCity = require('iran-city');
    this.citiesOfProvince = iranCity.citiesOfProvince(event.value.id);
  }
}
