import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from '@abp/ng.core';
import { Gender } from '@proxy/gender.enum';
import {
  EntryExitZaerService,
  FileService,
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
import 'moment/locale/fa';
import { MessageService } from 'primeng/api';

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
  currentTime: string;

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

    this.mokebService.getAllList().subscribe(x => {
      this.mokebs = x.items;
      this.mokebsDropDown = x.items.map(item => ({
        label: item.name,
        value: item.id,
      }));
    });

    setInterval(() => {
      this.currentTime = moment().format('hh:mm:ss A'); // Format time as 'hh:mm:ss AM/PM'
    }, 1000); // Update every second
  }

  changeGender(event: any) {
    const genderValue = event.value;
    const selectedItems = this.mokebs.filter(item => item.gender === genderValue);

    this.mokebsDropDown = selectedItems.map(item => ({
      label: item.name,
      value: item.id,
    }));
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

    // formData.append('image', formValue.image);

    const uploadFileDto: UploadFileDto = { file: formValue.image, name: formValue.image.name };

    const formData = new FormData();
    formData.append('File', formValue.image, formValue.image.name);
    formData.append('Name', formValue.image.name); // Example of adding additional form data

    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.form.get('entryExitDate')?.value.key);

    if (formData.get('File') != null)
      this.fileService.saveBlobStream(formData).subscribe(file => {
        formValue.imageFileName = file;
        this.zaerService.createNew(formValue).subscribe(x => {
          const entryExitDate: CreateUpdateEntryExitZaerDto = {
            zaerId: x.id,
            entryDate: entryDate,
            exitDate: exitDate,
            mokebId: x.mokebId,
          };
          this.entryExitZaerService.create(entryExitDate).subscribe(x => {
            this.form.reset();
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
  }

  getEntryDate(): string {
    const now = new Date();
    now.setHours(12, 0, 0, 0);
    return now.toISOString();
  }

  getExitDate(exitDate: number): string {
    const now = moment(); // Get the current date and time
    const futureDate = now.add(exitDate, 'days').toDate();
    futureDate.setHours(10, 0, 0, 0);
    return futureDate.toISOString();
  }
}
