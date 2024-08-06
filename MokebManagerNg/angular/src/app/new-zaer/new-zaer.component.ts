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
import { MokebDto, ZaerDto } from '@proxy/domain/dtos';
import { CreateUpdateEntryExitZaerDto } from '@proxy/domain/create-update-dtos';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  visible: boolean = false;
  zaerInformation: ZaerDto;
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
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle('مدیریت موکب | زائر جدید');
    this.initializeForm();
    this.loadEntryExitOptions();
    this.loadGenders();
    this.loadProvinces();
    this.getMokebsInformation();
    this.visible = false;
  }

  ngAfterViewInit(): void {
    this.fetchInitForm();
  }

  private fetchInitForm() {
    if (environment.mokebGenderReseption === 'Male') {
      this.form.patchValue({ gender: this.genders[0].value });
    } else if (environment.mokebGenderReseption === 'Female') {
      this.form.patchValue({ gender: this.genders[1].value });
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: [null],
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
      { name: '4 شب', key: '4' },
      { name: '5 شب', key: '5' },
      { name: '6 شب', key: '6' },
      { name: '7 شب', key: '7' },
      { name: '8 شب', key: '8' },
      { name: '9 شب', key: '9' },
      { name: '10 شب', key: '10' },
      { name: '11 شب', key: '11' },
      { name: '12 شب', key: '12' },
      { name: '13 شب', key: '13' },
      { name: '14 شب', key: '14' },
      { name: '15 شب', key: '15' },
      { name: '16 شب', key: '16' },
      { name: '17 شب', key: '17' },
      { name: '18 شب', key: '18' },
      { name: '19 شب', key: '19' },
      { name: '20 شب', key: '20' },
    ];
    this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
  }

  private loadGenders() {
    this.genders = [
      { label: 'آقا', value: Gender.Male },
      { label: 'خانم', value: Gender.Female },
    ];
  }

  private loadProvinces() {
    const iranCity = require('iran-city');
    this.allProvinces = iranCity.allProvinces();
  }

  private getMokebsInformation() {
    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
      this.mokebService.getAllList().subscribe(mokeb => {
        this.mokebs = mokeb.items;
        this.mokebsDropDown = mokeb.items.map(item => ({
          label: `${item.name} - ظرفیت خالی موکب : ${
            mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight ?? 0
          }`,
          value: item.id,
        }));
        this.changeGender();
      });
    });
  }

  changeGender() {
    const selectedItems = this.mokebs.filter(item => item.gender === this.form.value.gender);

    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
      this.mokebsDropDown = selectedItems
        .map(item => {
          const capacity = mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight ?? 0;
          return {
            label: `${item.name} - ظرفیت باقی مانده: ${capacity}`,
            value: item.id,
            freeCapacityToNight: capacity,
          };
        })
        .filter(item => item.freeCapacityToNight > 0)
        .map(item => ({
          label: item.label,
          value: item.value,
        }));

      if (this.mokebsDropDown.length > 0) {
        this.form.patchValue({ mokebId: this.mokebsDropDown[0].value });
      }
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

    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
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
    this.mokebStateService.getFreeState(formValue.mokebId).subscribe(freeStateRes => {
      this.zaerService.create(formValue).subscribe(
        zaerRes => {
          const mokebStateInput: CreateUpdateMokebStateDto = {
            zaerId: zaerRes.id,
            mokebId: zaerRes.mokebId,
            state: freeStateRes,
          };

          this.mokebStateService.create(mokebStateInput).subscribe(() => {
            const entryExitDate: CreateUpdateEntryExitZaerDto = {
              zaerId: zaerRes.id,
              entryDate: entryDate,
              exitDate: exitDate,
              exitAfterDate: this.form.get('entryExitDate').value.key,
              mokebId: zaerRes.mokebId,
            };
            this.entryExitZaerService.create(entryExitDate).subscribe(() => {
              this.showMessage('success', 'Success', 'Success');
              this.resetForm();
              this.showZaerInformation(zaerRes.id);
            });
          });
        },
        (error: any) => {
          console.log(error);
          const eror = error?.error;
          const errorCode = eror.message;
          const errorCodes = error?.error?.code ?? error?.code ?? null;
          if (errorCode === '307') {
            this.redirectToReservation();
          }
        }
      );
    });
  }

  private resetForm() {
    this.form.reset();
    this.fileUpload.clear();
    this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
    this.fetchInitForm();
    this.changeGender();
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 1000,
    });
  }

  private redirectToReservation() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'مشخصات تکراری می باشد به صفحه تمدید منتقل شوید؟',
      header: 'مشخصات تکراری',
      icon: 'pi pi-print',
      acceptButtonStyleClass: 'p-button-success p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.router.navigate(['reservation']);
      },
      reject: () => {},
    });
  }

  private showZaerInformation(id: string) {
    this.zaerService.getWithDetail(id).subscribe(zaerRes => {
      this.zaerInformation = zaerRes;
      this.visible = true;
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
