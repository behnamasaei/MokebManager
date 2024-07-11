import { AuthService, LocalizationService, LocalizationWithDefault } from '@abp/ng.core';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import Tesseract from 'tesseract.js';
import { OcrService } from '../services/ocr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent {
  ocrResult: string | null = null;
  tooltipItems: MenuItem[] | undefined;
  TooltipItems: MenuItem[] | undefined;
  items: MenuItem[] | undefined;
  localizations: string;

  /**
   *
   */
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private ocrService: OcrService,
    private localizationService: LocalizationService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.ocrService.recognize(file).then(({ data: { text } }) => {
        this.ocrResult = text;
      });
    }
  }

  ngOnInit() {
    if (!this.hasLoggedIn) {
      this.login();
    }

    this.items = [
      {
        label: this.localizationService.instant('::NewZaer'),
        icon: 'pi pi-plus',
        command: () => this.router.navigate(['./new-zaer']),
        style: { margin: '10px 0px' },
      },
      {
        label: this.localizationService.instant('::NewZaerWithId'),
        icon: 'pi pi-barcode',
        command: () => this.router.navigate(['./new-zaer-id']),
        style: { margin: '10px 0px' },
      },
      {
        label: this.localizationService.instant('::SaveEntryExitClock'),
        icon: 'pi pi-clock',
        command: () => this.router.navigate(['./clock-entry-exit']),
        style: { margin: '10px 0px' },
      },
      {
        label: this.localizationService.instant('::ExtensionOfReservation'),
        icon: 'pi pi-sync',
        command: () => this.router.navigate(['./reservation']),
        style: { margin: '10px 0px' },
      },
      {
        label: this.localizationService.instant('::MokebSettings'),
        icon: 'pi pi-cog',
        command: () => this.router.navigate(['./settings/mokeb']),
        style: { margin: '10px 0px' },
      },
      {
        label: this.localizationService.instant('::Zaers'),
        icon: 'pi pi-users',
        command: () => this.router.navigate(['./zaers']),
        style: { margin: '10px 0px' },
      },
    ];
  }

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  login() {
    this.authService.navigateToLogin();
  }
}
