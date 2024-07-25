import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EntryExitZaerService, ZaerService } from '@proxy';
import { MessageService } from 'primeng/api';
import moment from 'moment';
import { error } from 'console';
import { Title } from '@angular/platform-browser';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-set-exit-date',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './set-exit-date.component.html',
  styleUrls: ['./set-exit-date.component.scss'],
  providers: [MessageService],
})
export class SetExitDateComponent implements OnInit {
  scanResult: string | null = null;
  passportNo: string = '';
  scanShow: boolean = false;
  entryExitOptions: any[] = [];
  selectedEntryExit: any;
  @ViewChild(BarcodeScannerComponent) barcodescanner: BarcodeScannerComponent;

  constructor(
    private entryExitService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('مدیریت موکب | ثبت خروج');
    // Initialization logic if any
  }

  handleScanResult(result: string): void {
    this.scanResult = result;
    console.log('Received scan result:', result);
    // Additional logic to handle the scanned result
  }

  save(): void {
    const exitDate = this.getExitNowDate();

    if (this.scanResult) {
      this.processExitDate(this.scanResult, exitDate);
    }

    if (this.passportNo) {
      this.processExitDateWithPassport(this.passportNo, exitDate);
    }
  }

  private processExitDate(scanResult: string, exitDate: string): void {
    this.zaerService.get(scanResult).subscribe(
      zaer => {
        this.setExitDate(zaer.id, exitDate);
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Success',
          life: 1000,
        });
      }
    );
  }

  private processExitDateWithPassport(passportNo: string, exitDate: string): void {
    this.zaerService.getWithPassportNo(passportNo).subscribe(
      zaer => {
        this.setExitDate(zaer.id, exitDate);
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Success',
          life: 1000,
        });
      }
    );
  }

  private setExitDate(id: string, exitDate: string): void {
    this.entryExitService.setExitDate(id, exitDate).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Success',
        life: 1000,
      });

      this.resetForm();
    });
  }

  private resetForm(): void {
    this.scanResult = null;
    this.selectedEntryExit = this.entryExitOptions[0];
  }

  handleScanSuccess(result: string): void {
    this.scanResult = result;
  }

  getExitNowDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  isValidGuid(): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(this.scanResult);
  }
}
