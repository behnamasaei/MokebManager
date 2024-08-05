import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { EntryExitZaerService, ZaerService } from '@proxy';
import { CreateUpdateEntryExitZaerDto } from '@proxy/domain/create-update-dtos';
import moment from 'moment';
import { Title } from '@angular/platform-browser';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  providers: [MessageService],
})
export class ReservationComponent {
  scanResult: string | null = null;
  passportNo: string;
  scanShow: boolean = false;
  entryExitOptions: any[] = [];
  selectedEntryExit;
  @ViewChild(BarcodeScannerComponent) barcodescanner: BarcodeScannerComponent;

  /**
   *
   */
  constructor(
    private entryExitService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('مدیریت موکب | تمدید پذیرش');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
    this.selectedEntryExit = this.entryExitOptions[0];
  }

  ngAfterViewInit(): void {
    this.barcodescanner.startScanning();
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

  save() {
    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.selectedEntryExit.key);

    if (this.scanResult !== null) {
      this.zaerService.get(this.scanResult).subscribe(zaer => {
        const input: CreateUpdateEntryExitZaerDto = {
          zaerId: zaer.id,
          entryDate: entryDate,
          exitDate: exitDate,
          exitAfterDate: this.selectedEntryExit.key,
          mokebId: zaer.mokebId,
        };
        this.entryExitService.create(input).subscribe(x => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success',
            life: 1000,
          });
          this.barcodeScan();
          this.scanResult = null;
          this.selectedEntryExit = this.entryExitOptions[0];
        });
      });
    }
    if (this.passportNo !== null && this.passportNo !== '' && this.passportNo !== undefined) {
      this.zaerService.getWithPassportNo(this.passportNo).subscribe(zaer => {
        const input: CreateUpdateEntryExitZaerDto = {
          zaerId: zaer.id,
          entryDate: entryDate,
          exitDate: exitDate,
          exitAfterDate: this.selectedEntryExit.key,
          mokebId: zaer.mokebId,
        };
        this.entryExitService.create(input).subscribe(x => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success',
            life: 1000,
          });
          this.barcodeScan();
          this.scanResult = null;
          this.passportNo = '';
          this.selectedEntryExit = this.entryExitOptions[0];
        });
      });
    }
  }

  handleScanSuccess(result: string): void {
    this.scanResult = result;
  }

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  getExitDate(exitDate: number): string {
    const exitDaysAfter = moment.utc().add(exitDate, 'days').format('YYYY-MM-DDT11:00:00.000[Z]'); // Two days after current UTC date

    return exitDaysAfter;
  }

  isValidGuid(): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(this.scanResult);
  }
}
