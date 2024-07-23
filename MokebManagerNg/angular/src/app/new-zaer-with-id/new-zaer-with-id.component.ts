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
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-new-zaer-with-id',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-zaer-with-id.component.html',
  styleUrls: ['./new-zaer-with-id.component.scss'],
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
  hasDevices: boolean;
  hasPermission: boolean;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;

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
    private mokebStateService: MokebStateService
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
  }

  private initializeTitle() {
    this.titleService.setTitle('مدیریت موکب | زائر جدید با شناسه');
  }

  private initializeEntryExitOptions() {
    this.entryExitOptions = [
      { name: '1 شب', key: '1' },
      { name: '2 شب', key: '2' },
      { name: '3 شب', key: '3' },
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
    this.localizationService.get('::Female').subscribe(female => {
      this.localizationService.get('::Male').subscribe(male => {
        this.genders = [
          { label: male, value: Gender.Male },
          { label: female, value: Gender.Female },
        ];
      });
    });
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
    this.localizationService.get('::FreeCapacityToNight').subscribe(localization => {
      this.mokebService.getMokebFreeCapacityToNight().subscribe(mokebCapacity => {
        this.mokebService.getAllList().subscribe(mokeb => {
          this.mokebs = mokeb.items;
          this.populateMokebsDropDown(mokebCapacity, localization);
          this.changeGender();
        });
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
    this.zaerService.createNewWithId(formValue).subscribe(zaerRes => {
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
    });
  }

  private createEntryExitZaer(entryExitDate: CreateUpdateEntryExitZaerDto) {
    this.entryExitZaerService.create(entryExitDate).subscribe(() => {
      this.resetForm();
      this.showMessage('Success', 'Success');
    });
  }

  private resetForm() {
    this.form.reset();
    this.fileUpload.clear();
    this.scanShow = false;
    this.scanResult = null;
    this.form.patchValue({ entryExitDate: this.entryExitOptions[0] });
  }

  private showMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
      life: 1000,
    });
  }

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  getExitDate(exitDate: number): string {
    return moment.utc().add(exitDate, 'days').format('YYYY-MM-DDT11:00:00.000');
  }
}
