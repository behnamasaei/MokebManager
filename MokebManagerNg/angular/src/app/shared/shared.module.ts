import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { PanelModule } from 'primeng/panel';
import { SpeedDialModule } from 'primeng/speeddial';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

const primeNgModules = [
  TableModule,
  ToastModule,
  ToolbarModule,
  ButtonModule,
  InputTextModule,
  DataViewModule,
  RippleModule,
  DropdownModule,
  CardModule,
  ConfirmDialogModule,
  PaginatorModule,
  AccordionModule,
  FileUploadModule,
  RadioButtonModule,
  PanelModule,
  SpeedDialModule,
  DockModule,
  TooltipModule,
  MenuModule,
  BadgeModule,
  RippleModule,
  AvatarModule,
  PanelMenuModule,
  ChartModule,
  CalendarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    BarcodeScannerLivestreamModule,
    ...primeNgModules,
  ],
  exports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    BarcodeScannerLivestreamModule,
    ZXingScannerModule,
    ...primeNgModules,
  ],
  providers: [],
})
export class SharedModule {}
