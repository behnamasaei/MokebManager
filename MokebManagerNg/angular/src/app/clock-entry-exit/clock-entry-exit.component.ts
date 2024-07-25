import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  ClockEntryExitService,
  CreateUpdateClockEntryExitDto,
  EntryExitZaerService,
  MokebService,
} from '@proxy';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-clock-entry-exit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clock-entry-exit.component.html',
  styleUrls: ['./clock-entry-exit.component.scss'],
  providers: [MessageService],
})
export class ClockEntryExitComponent {
  @ViewChild(BarcodeScannerComponent) barcodescanner: BarcodeScannerComponent;
  scanResult: string | null = null;
  mokebName: string;
  accessResult: string;
  style: string;

  constructor(
    private clockEntryExitService: ClockEntryExitService,
    private entryExitService: EntryExitZaerService,
    private messageService: MessageService,
    private mokebService: MokebService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('مدیریت موکب | ساعت عبور');
  }

  handleScanResult(result: string): void {
    this.scanResult = result;
    console.log('Received scan result:', result);
    this.save();
  }

  barcodeScan() {
    this.scanResult = '';
    this.accessResult = '';
    this.mokebName = '';
    this.style = '';
    this.barcodescanner.startScanning();
  }

  save() {
    if (!this.scanResult) return;

    const input: CreateUpdateClockEntryExitDto = {
      zaerId: this.scanResult,
      entryExitClock: this.getCurrentUtcDate(),
    };

    this.entryExitService.get(this.scanResult).subscribe(entryExitRes => {
      if (!entryExitRes) {
        this.accessResult = 'غیرمجاز';
        this.style = 'red';
        return;
      }

      const currentTime = moment.utc();
      const exitDate = moment(entryExitRes.exitDate);

      if (currentTime.isBefore(exitDate)) {
        this.accessResult = 'مجاز';
        this.style = 'green';
        this.mokebService.get(entryExitRes.mokebId).subscribe(mokebRes => {
          this.mokebName = mokebRes.name;
          this.clockEntryExitService.create(input).subscribe(
            () => {
              this.scanResult = null;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Success',
                life: 1000,
              });
            },
            () => {
              this.accessResult = 'غیرمجاز';
              this.style = 'red';
            }
          );
        });
      } else {
        this.accessResult = 'غیرمجاز';
        this.style = 'red';
      }
    });
  }

  getCurrentUtcDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }
}
