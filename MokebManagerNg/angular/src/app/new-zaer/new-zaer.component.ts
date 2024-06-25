import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from '@abp/ng.core';
import { Gender } from '@proxy/gender.enum';
import {
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
  CreateUpdateZaerDto,
} from '@proxy/domain/create-update-dtos';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-new-zaer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-zaer.component.html',
  styleUrl: './new-zaer.component.scss',
  providers: [MessageService],
})
export class NewZaerComponent {
  form: FormGroup;
  formData: FormData;
  formEntryExitGroup: FormGroup;
  genders: any[] = [];
  mokebsDropDown: any[] = [];
  mokebs: MokebDto[] = [];
  entryExitOptions: any[] = [];
  mokebCapacityToNight: MokebCapacityDto[] = [];
  currentTime: string;
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
    const formValue: CreateUpdateZaerDto | any = { ...this.form.value };
    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.form.get('entryExitDate')?.value.key);

    if (formValue.image != null) {
      const formData = new FormData();
      formData.append('File', formValue.image, formValue.image.name);
      formData.append('Name', formValue.image.name); // Example of adding additional form data

      this.fileService.saveBlobStream(formData).subscribe(file => {
        formValue.imageFileName = file;
        this.zaerService.create(formValue).subscribe(x => {
          const entryExitDate: CreateUpdateEntryExitZaerDto = {
            zaerId: x.id,
            entryDate: entryDate,
            exitDate: exitDate,
            mokebId: x.mokebId,
          };
          this.entryExitZaerService.create(entryExitDate).subscribe(x => {
            this.form.reset();
            this.fileUpload.clear();
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
      this.zaerService.create(formValue).subscribe(x => {
        const entryExitDate: CreateUpdateEntryExitZaerDto = {
          zaerId: x.id,
          entryDate: entryDate,
          exitDate: exitDate,
          mokebId: x.mokebId,
        };
        this.entryExitZaerService.create(entryExitDate).subscribe(x => {
          this.form.reset();
          this.fileUpload.clear();
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
}
