import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { ClockEntryExitService, CreateUpdateClockEntryExitDto } from '@proxy';
import * as moment from 'moment';

@Component({
  selector: 'app-clock-entry-exit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clock-entry-exit.component.html',
  styleUrl: './clock-entry-exit.component.scss',
  providers: [MessageService],
})
export class ClockEntryExitComponent {
  scanResult: string | null = null;
  selectedDevice: MediaDeviceInfo | undefined;

  /**
   *
   */
  constructor(
    private clockEntryExitServie: ClockEntryExitService,
    private messageService: MessageService
  ) {}

  handleScanSuccess(result: string): void {
    if (this.isValidGuid(result)) {
      this.scanResult = result;
    }
  }

  isValidGuid(guid: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(guid);
  }

  save() {
    if (this.scanResult != null) {
      const input: CreateUpdateClockEntryExitDto = {
        zaerId: this.scanResult,
        entryExitClock: this.getEntryDate(),
      };
      this.clockEntryExitServie.create(input).subscribe(x => {
        this.scanResult = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Success',
          life: 1000,
        });
      });
    }
  }

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }
}
