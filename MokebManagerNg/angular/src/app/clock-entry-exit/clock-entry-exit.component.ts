import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { ClockEntryExitService, CreateUpdateClockEntryExitDto, EntryExitZaerService } from '@proxy';
import * as moment from 'moment';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { error } from 'console';

@Component({
  selector: 'app-clock-entry-exit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clock-entry-exit.component.html',
  styleUrl: './clock-entry-exit.component.scss',
  providers: [MessageService],
})
export class ClockEntryExitComponent {
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  @ViewChild('audioPlayerError', { static: false })
  audioPlayerErrorRef: ElementRef<HTMLAudioElement>;
  @ViewChild('audioPlayerSuccess', { static: false })
  audioPlayerSuccessRef: ElementRef<HTMLAudioElement>;

  styleScanner: string = '10px solid gray';
  scanResult: string | null = null;
  hasDevices: boolean;
  hasPermission: boolean;
  torchEnabled: boolean = false;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  timeBetweenScansMillis: number = 50; // Reduce the delay for faster scans

  /**
   *
   */
  constructor(
    private clockEntryExitServie: ClockEntryExitService,
    private entryExitService: EntryExitZaerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.styleScanner = 'gainsboro';
    this.audioPlayerErrorRef.nativeElement.play();
  }

  save() {
    if (this.scanResult != null) {
      const input: CreateUpdateClockEntryExitDto = {
        zaerId: this.scanResult,
        entryExitClock: this.getEntryDate(),
      };

      this.entryExitService.get(this.scanResult).subscribe(x => {
        if (x === null) {
          this.audioPlayerErrorRef.nativeElement.play();
          this.styleScanner = 'red';
          return false;
        }

        // Get the current UTC time in the desired format
        const currentTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const exitDate = x.exitDate;

        // Compare the times
        if (moment(currentTime).isBefore(exitDate)) {
          this.audioPlayerSuccessRef.nativeElement.play();
          this.styleScanner = 'green';
          this.clockEntryExitServie.create(input).subscribe(
            x => {
              this.scanResult = null;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Success',
                life: 1000,
              });
            },
            error => {
              this.audioPlayerErrorRef.nativeElement.play();
              this.styleScanner = 'red';
            }
          );
          return true;
        } else if (moment(currentTime).isAfter(exitDate)) {
          this.audioPlayerErrorRef.nativeElement.play();
          this.styleScanner = 'red';
          return false;
        } else {
          this.styleScanner = 'gainsboro';
          return null;
        }
      });
    }
  }

  getExitNowDate(): string {
    return moment.utc().format('YYYY-MM-DDT11:00:00.000[Z]');
  }

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.styleScanner = 'gainsboro';
    if (this.isValidGuid(resultString)) {
      this.scanResult = resultString;
    }
  }

  isValidGuid(guid: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(guid);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    if (isCompatible) {
      this.torchEnabled = true;
    }
  }

  toggleTorch() {
    this.torchEnabled = !this.torchEnabled;
  }
}
