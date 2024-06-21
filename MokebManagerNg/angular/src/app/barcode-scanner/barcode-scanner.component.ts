import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss',
})
export class BarcodeScannerComponent {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started) {
    console.log(started);
  }
}
