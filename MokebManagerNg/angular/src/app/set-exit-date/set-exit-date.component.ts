import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import {
  ClockEntryExitService,
  CreateUpdateClockEntryExitDto,
  EntryExitZaerService,
  ZaerService,
} from '@proxy';
import { MessageService } from 'primeng/api';
import moment from 'moment';

@Component({
  selector: 'app-set-exit-date',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './set-exit-date.component.html',
  styleUrl: './set-exit-date.component.scss',
})
export class SetExitDateComponent {
  scanResult: string | null = null;
  passportNo: string;
  scanShow: boolean = false;
  entryExitOptions: any[] = [];
  selectedEntryExit;

  /**
   *
   */
  constructor(
    private entryExitService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  save() {
    const exitDate = this.getExitNowDate();

    if (this.scanResult !== null) {
      this.zaerService.get(this.scanResult).subscribe(zaer => {
        this.entryExitService.setExitDate(zaer.id, exitDate).subscribe(x => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success',
            life: 1000,
          });

          this.scanResult = null;
          this.selectedEntryExit = this.entryExitOptions[0];
        });
      });
    }
    if (this.passportNo !== null) {
      this.zaerService.getWithPassportNo(this.passportNo).subscribe(zaer => {
        this.entryExitService.setExitDate(zaer.id, exitDate).subscribe(x => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success',
            life: 1000,
          });

          this.scanResult = null;
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

  getExitNowDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  isValidGuid(): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(this.scanResult);
  }
}
