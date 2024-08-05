import { Component, ViewChild } from '@angular/core';
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
  UploadFileDto,
  ZaerService,
} from '@proxy';
import { MokebDto } from '@proxy/domain/dtos';
import {
  CreateUpdateEntryExitZaerDto,
  CreateUpdateMokebDto,
} from '@proxy/domain/create-update-dtos';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-zaer-with-id',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-zaer-with-id.component.html',
  styleUrls: ['./new-zaer-with-id.component.scss'],
  providers: [MessageService, ConfirmationService],
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
  hasDevices: boolean;
  hasPermission: boolean;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  @ViewChild(BarcodeScannerComponent) barcodescanner: BarcodeScannerComponent;

  hasDevices$ = new BehaviorSubject<boolean>(false);
  hasPermission$ = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private mokebService: MokebService,
    private entryExitZaerService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService,
    private fileService: FileService,
    private titleService: Title,
    private mokebStateService: MokebStateService,
    private confirmationService: ConfirmationService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeTitle();
    this.initializeEntryExitOptions();
    this.initializeForm();
    this.loadGenders();
    this.loadAllProvinces();
    this.getMokebsInformation();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.fetchInitForm();
    this.barcodeScan();
  }

  barcodeScan() {
    this.scanResult = '';
    this.barcodescanner.startScanning();
  }

  handleScanResult(result: string): void {
    this.scanResult = result;
    console.log('Received scan result:', result);
    // Additional logic to handle the scanned result
  }

  private initializeTitle() {
    this.titleService.setTitle('مدیریت موکب | زائر جدید با شناسه');
  }

  private initializeEntryExitOptions() {
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
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: [null],
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
  }

  private loadGenders() {
    this.genders = [
      { label: 'آقا', value: Gender.Male },
      { label: 'خانم', value: Gender.Female },
    ];
  }

  private loadAllProvinces() {
    const iranCity = require('iran-city');
    this.allProvinces = iranCity.allProvinces();
  }

  getCitiesOfProvice(event) {
    const iranCity = require('iran-city');
    this.citiesOfProvince = iranCity.citiesOfProvince(event.value.id);
  }

  private fetchInitForm() {
    const genderReception = environment.mokebGenderReseption;
    const genderValue = genderReception === 'Male' ? this.genders[0].value : this.genders[1].value;
    this.form.patchValue({ gender: genderValue });
  }

  getMokebsInformation() {
    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
      this.mokebService.getAllList().subscribe(mokeb => {
        this.mokebs = mokeb.items;
        this.populateMokebsDropDown(mokebCapacity, 'ظرفیت خالی امشب');
        this.changeGender();
      });
    });
  }

  private populateMokebsDropDown(mokebCapacity, localization) {
    this.mokebsDropDown = this.mokebs.map(item => ({
      label: `${item.name} - ${localization} : ${
        mokebCapacity.find(x => x.mokebId === item.id).freeCapacityToNight
      }`,
      value: item.id,
    }));
  }

  changeGender() {
    const selectedGender = this.form.value.gender;
    const selectedItems = this.mokebs.filter(item => item.gender === selectedGender);

    this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
      this.updateMokebsDropDown(selectedItems, mokebCapacity);
      this.setInitialMokebId();
    });
  }

  private updateMokebsDropDown(selectedItems, mokebCapacity) {
    this.mokebsDropDown = selectedItems
      .map(item => {
        const capacity = mokebCapacity.find(x => x.mokebId === item.id)?.freeCapacityToNight || 0;
        return {
          label: `${item.name} - ظرفیت باقی مانده: ${capacity}`,
          value: item.id,
          freeCapacityToNight: capacity,
        };
      })
      .filter(item => item.freeCapacityToNight > 0)
      .map(item => ({ label: item.label, value: item.value }));
  }

  private setInitialMokebId() {
    if (this.mokebsDropDown.length > 0) {
      this.form.patchValue({ mokebId: this.mokebsDropDown[0].value });
    }
  }

  onFileSelected(event) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      this.form.get('image').setValue(file);
      this.formData.append('image', file);
    }
  }

  onSubmit() {
    const formValue = this.prepareFormValue();
    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.form.get('entryExitDate')?.value.key);

    if (formValue.image) {
      this.uploadImage(formValue, entryDate, exitDate);
      this.createZaerWithId(formValue, entryDate, exitDate);
    } else {
      this.createZaerWithId(formValue, entryDate, exitDate);
    }
  }

  private prepareFormValue(): CreateZaerDto | any {
    const formValue: CreateZaerDto | any = { ...this.form.value };
    formValue.city = formValue.city?.name ?? '';
    formValue.state = formValue.state?.name ?? '';
    formValue.id = this.scanResult;
    return formValue;
  }

  private uploadImage(formValue, entryDate, exitDate) {
    const formData = new FormData();
    formData.append('File', formValue.image, formValue.image.name);
    formData.append('Name', formValue.image.name);

    this.fileService.saveBlobStream(formData).subscribe(file => {
      formValue.imageFileName = file;
      this.createZaerWithId(formValue, entryDate, exitDate);
    });
  }

  private createZaerWithId(formValue, entryDate, exitDate) {
    this.zaerService.createNewWithId(formValue).subscribe(
      zaerRes => {
        const entryExitDate: CreateUpdateEntryExitZaerDto = {
          zaerId: zaerRes.id,
          entryDate: entryDate,
          exitAfterDate: this.form.get('entryExitDate')?.value.key,
          exitDate: exitDate,
          mokebId: zaerRes.mokebId,
        };

        this.mokebStateService.getFreeState(zaerRes.mokebId).subscribe(freeStateRes => {
          const mokebStateInput: CreateUpdateMokebStateDto = {
            zaerId: zaerRes.id,
            mokebId: zaerRes.mokebId,
            state: freeStateRes,
          };

          this.mokebStateService.create(mokebStateInput).subscribe();
        });

        this.createEntryExitZaer(entryExitDate);
      },
      error => {
        if (error.error.code === '307') {
          this.redirectToReservation();
        }
      }
    );
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

  private createEntryExitZaer(entryExitDate: CreateUpdateEntryExitZaerDto) {
    this.entryExitZaerService.create(entryExitDate).subscribe(zaerRes => {
      this.resetForm();
      this.printZaerCard(zaerRes.id);
      this.barcodeScan();
      this.showMessage('Success', 'Success', 'Success');
    });
  }

  private resetForm() {
    this.form.reset();
    this.fileUpload.clear();
    this.scanShow = false;
    this.scanResult = null;
    this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
    this.fetchInitForm();
    this.changeGender();
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

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  getExitDate(exitDate: number): string {
    return moment.utc().add(exitDate, 'days').format('YYYY-MM-DDT11:00:00.000');
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 1000,
    });
  }
}
