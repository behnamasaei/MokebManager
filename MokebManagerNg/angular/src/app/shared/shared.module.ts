import { CoreModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
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
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PageModule } from '@abp/ng.components/page';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideDateFnsAdapter } from 'ngx-material-date-fns-adapter';
import { SelectButtonModule } from 'primeng/selectbutton';

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
  BreadcrumbModule,
  DividerModule,
  InputGroupModule,
  InputGroupAddonModule,
  InputMaskModule,
  PasswordModule,
  CheckboxModule,
  SelectButtonModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    BarcodeScannerLivestreamModule,
    PageModule,
    FormsModule,
    ...primeNgModules,
  ],
  exports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    BarcodeScannerLivestreamModule,
    ZXingScannerModule,
    PageModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ...primeNgModules,
  ],
  providers: [provideNativeDateAdapter(), provideDateFnsAdapter()],
})
export class SharedModule {}
