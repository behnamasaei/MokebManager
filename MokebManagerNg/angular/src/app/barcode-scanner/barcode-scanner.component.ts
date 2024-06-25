import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { Buffer } from 'buffer';
import * as moment from 'moment';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss',
})
export class BarcodeScannerComponent {
  scanResult: string | null = null;
  selectedDevice: MediaDeviceInfo | undefined;
  styleScanner;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit(): void {
    const buffer = Buffer.from('Hello, world!');
    console.log(buffer.toString());
  }

  handleScanSuccess(result: string): void {
    this.scanResult = result;
    this.checkTimeBeforeOrAfterEntryDate();
  }

  getExitNowDate(): string {
    return moment.utc().format('YYYY-MM-DDT11:00:00.000[Z]');
  }

  checkTimeBeforeOrAfterEntryDate(): boolean {
    // Get the current UTC time in the desired format
    const currentTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    // this.scanResult += currentTime;

    // Get the entry date in the same format
    const exitDate = this.scanResult; // Assuming getEntryDate() returns a date in some format
    // this.scanResult += exitDate;
    // Compare the times
    if (moment(currentTime).isBefore(exitDate)) {
      this.styleScanner = { border: '20px solid green' };
      this.resetStyleAfterDelay();
      return true;
    } else if (moment(currentTime).isAfter(exitDate)) {
      this.styleScanner = { border: '20px solid red' };
      this.resetStyleAfterDelay();
      return false;
    } else {
      this.styleScanner = { border: '' };
      return null;
    }
  }

  private resetStyleAfterDelay(): void {
    setTimeout(() => {
      this.styleScanner = { border: '' };
    }, 2000); // Reset border after 2 seconds (2000 milliseconds)
  }
}
