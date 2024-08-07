import { Component, ViewChild, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from '@abp/ng.core';
import { Gender } from '@proxy/gender.enum';
import {
  CreateUpdateMokebStateDto,
  CreateZaerDto,
  EntryExitZaerService,
  FileService,
  MokebCapacityDto,
  MokebService,
  MokebStateService,
  ReportService,
  ZaerService,
} from '@proxy';
import { EntryExitZaerDto, MokebDto, ZaerDto } from '@proxy/domain/dtos';
import { CreateUpdateEntryExitZaerDto } from '@proxy/domain/create-update-dtos';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-zaer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-zaer.component.html',
  styleUrls: ['./new-zaer.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewZaerComponent implements OnInit {
  form: FormGroup;
  formData: FormData = new FormData();
  genders: any[] = [];
  mokebsDropDown: any[] = [];
  mokebs: MokebDto[] = [];
  entryExitOptions: any[] = [];
  mokebCapacityToNight: MokebCapacityDto[] = [];
  allProvinces: any[] = [];
  citiesOfProvince: any[] = [];
  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private mokebService: MokebService,
    private entryExitZaerService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService,
    private fileService: FileService,
    private mokebStateService: MokebStateService,
    private confirmationService: ConfirmationService,
    private reportService: ReportService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('مدیریت موکب | زائر جدید');
    this.initializeForm();
    this.loadEntryExitOptions();
    this.loadGenders();
    this.loadProvinces();
    this.getMokebsInformation();
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: [null],
      family: [null],
      gender: [null, Validators.required],
      image: [null],
      passportNo: [null, Validators.required],
      mokebId: [null, Validators.required],
      entryExitDate: [null, Validators.required],
      phoneNumber: [null],
      state: [null],
      city: [null],
      address: [null],
    });
  }

  private loadEntryExitOptions() {
    this.entryExitOptions = [
      { name: '1 شب', key: '1' },
      { name: '2 شب', key: '2' },
      { name: '3 شب', key: '3' },
    ];
    this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
  }

  private loadGenders() {
    this.localizationService.get('::Female').subscribe(female => {
      this.localizationService.get('::Male').subscribe(male => {
        this.genders = [
          { label: male, value: Gender.Male },
          { label: female, value: Gender.Female },
        ];
      });
    });
  }

  private loadProvinces() {
    const iranCity = require('iran-city');
    this.allProvinces = iranCity.allProvinces();
  }

  private getMokebsInformation() {
    this.localizationService.get('::FreeCapacityToNight').subscribe(localization => {
      this.mokebService.getMokebCapacityToNight().subscribe(mokebCapacity => {
        this.mokebService.getAllList().subscribe(mokeb => {
          this.mokebs = mokeb.items;
          this.mokebsDropDown = mokeb.items.map(item => ({
            label: `${item.name} - ${localization} : ${
              mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight ?? 0
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
              mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight ?? 0;
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
    const formValue: CreateZaerDto | any = { ...this.form.value };
    formValue.city = formValue.city?.name ?? '';
    formValue.state = formValue.state?.name ?? '';
    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.form.get('entryExitDate').value.key);

    this.mokebService.getMokebCapacityToNight().subscribe(mokebCapacity => {
      if (mokebCapacity.find(e => e.mokebId === formValue.mokebId)?.freeCapacityToNight > 0) {
        if (formValue.image) {
          const formData = new FormData();
          formData.append('File', formValue.image, formValue.image.name);
          formData.append('Name', formValue.image.name);

          this.fileService.saveBlobStream(formData).subscribe(file => {
            formValue.imageFileName = file;
            this.saveZaer(formValue, entryDate, exitDate);
          });
        } else {
          this.saveZaer(formValue, entryDate, exitDate);
        }
      } else {
        this.showMessage('error', 'اتمام ظرقیت', 'ظرفیت موکب پر شد.');
      }
    });
  }

  private saveZaer(formValue: CreateZaerDto, entryDate: string, exitDate: string) {
    this.zaerService.create(formValue).subscribe(zaer => {
      const mokebStateInput: CreateUpdateMokebStateDto = {
        zaerId: zaer.id,
        mokebId: zaer.mokebId,
        state: 1,
      };

      this.mokebStateService.create(mokebStateInput).subscribe(() => {
        const entryExitDate: CreateUpdateEntryExitZaerDto = {
          zaerId: zaer.id,
          entryDate: entryDate,
          exitDate: exitDate,
          mokebId: zaer.mokebId,
        };
        this.entryExitZaerService.create(entryExitDate).subscribe(() => {
          this.showMessage('success', 'Success', 'Success');
          this.resetForm();
          this.printZaerCard(zaer.id);
        });
      });
    });
  }

  private resetForm() {
    this.form.reset();
    this.fileUpload.clear();
    this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 1000,
    });
  }

  private printZaerCard(id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'آیا برای زائر کارت چاپ شود؟',
      header: 'چاپ کارت',
      icon: 'pi pi-print',
      acceptButtonStyleClass: 'p-button-success p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.zaerService.getWithDetail(id).subscribe(zaerRes => {
          this.reportService.generateCardZaer(zaerRes).subscribe(() => {
            this.showMessage('success', 'Success', 'Success');
          });
        });
      },
      reject: () => {},
    });
  }

  private getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  private getExitDate(exitDays: number): string {
    return moment.utc().add(exitDays, 'days').format('YYYY-MM-DDT11:00:00.000[Z]');
  }

  getCitiesOfProvice(event) {
    const iranCity = require('iran-city');
    this.citiesOfProvince = iranCity.citiesOfProvince(event.value.id);
  }
}
