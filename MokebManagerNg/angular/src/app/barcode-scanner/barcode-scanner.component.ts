import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements AfterViewInit, OnDestroy {
  scannerStarted = false;
  private html5QrcodeScanner: Html5QrcodeScanner;
  @Output() scanResultEvent = new EventEmitter<string>();
  @Input() scannerId: string;

  constructor() {}

  ngOnInit(): void {
    this.startScanning();
  }

  ngAfterViewInit(): void {
    this.startScanning();
  }

  ngOnDestroy(): void {
    this.stopScanning();
  }

  private initializeScanner(): void {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      this.scannerId,
      { fps: 60, qrbox: { width: 200, height: 200 } },
      false
    );
    this.html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
    this.scannerStarted = true;
  }

  private onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    this.scanResultEvent.emit(decodedText);
    this.stopScanning();
  };

  private onScanFailure = (error: any) => {
    console.error(`Code scan failed = ${error}`);
  };

  stopScanning(): void {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner
        .clear()
        .then(() => {
          console.log('QR code scanning stopped.');
          this.scannerStarted = false;
        })
        .catch(error => {
          console.error('Failed to stop scanning:', error);
        });
    }
  }

  startScanning(): void {
    if (!this.scannerStarted) {
      this.initializeScanner();
      console.log('QR code scanning started.');
    } else {
      console.log('Scanner is already running.');
    }
  }
}
