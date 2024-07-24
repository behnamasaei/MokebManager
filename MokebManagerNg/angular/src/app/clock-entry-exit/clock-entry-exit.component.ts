import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import {
  ClockEntryExitService,
  CreateUpdateClockEntryExitDto,
  EntryExitZaerService,
  MokebService,
} from '@proxy';
import * as moment from 'moment';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { error } from 'console';
import { Title } from '@angular/platform-browser';

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
  mokebName: string;

  /**
   *
   */
  constructor(
    private clockEntryExitServie: ClockEntryExitService,
    private entryExitService: EntryExitZaerService,
    private messageService: MessageService,
    private mokebService: MokebService,
    private titleService: Title
  ) {}

  scannerEnabled = false;
  scannerError: string | null = null;

  ngOnInit(): void {
    this.titleService.setTitle('مدیریت موکب | ساعت عبور');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.styleScanner = 'gainsboro';
    this.audioPlayerErrorRef.nativeElement.play();
  }

  ngAfterViewInit() {
    if (this.scanner) {
      this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
        // Handle found devices
      });

      this.scanner.camerasNotFound.subscribe((error: any) => {
        console.error('No cameras found:', error);
        this.scannerError = 'No cameras found. Please ensure you have a working camera.';
      });

      this.scanner.permissionResponse.subscribe((answer: boolean) => {
        this.scannerEnabled = answer;
      });

      this.scanner.scanError.subscribe((error: Error) => {
        console.error('Scanner error:', error);
        this.scannerError = `Scanner error: ${error.message}`;
      });
    }
  }

  onCodeScanned(result: string) {
    console.log('QR Code scanned:', result);
    // Handle the scanned result here
  }

  toggleScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.scannerError = null; // Reset error when toggling
  }

  save() {
    if (this.scanResult != null) {
      const input: CreateUpdateClockEntryExitDto = {
        zaerId: this.scanResult,
        entryExitClock: this.getEntryDate(),
      };

      this.entryExitService.get(this.scanResult).subscribe(entryExitRes => {
        if (entryExitRes === null) {
          this.audioPlayerErrorRef.nativeElement.play();
          this.styleScanner = 'red';
          return false;
        }

        // Get the current UTC time in the desired format
        const currentTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const exitDate = entryExitRes.exitDate;

        // Compare the times
        if (moment(currentTime).isBefore(exitDate)) {
          this.audioPlayerSuccessRef.nativeElement.play();
          this.styleScanner = 'green';
          this.mokebService.get(entryExitRes.mokebId).subscribe(mokebRes => {
            this.mokebName = mokebRes.name;
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
          });

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
    this.scanResult = resultString;
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
