import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { Buffer } from 'buffer';
import * as moment from 'moment';
import { Html5QrcodeScanner } from 'html5-qrcode';

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
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  private html5QrcodeScanner: Html5QrcodeScanner;
  ngOnInit(): void {
    const buffer = Buffer.from('Hello, world!');
    console.log(buffer.toString());
  }

  ngAfterViewInit(): void {
    // Initialize the Html5QrcodeScanner after the view is initialized
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    // Render the scanner
    this.html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
  }

  // Define the onScanSuccess callback function
  onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    // Handle the scanned code here
  };

  // Define the onScanFailure callback function
  onScanFailure = (error: any) => {
    console.error(`Code scan failed = ${error}`);
    // Handle scan failure here
  };

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
