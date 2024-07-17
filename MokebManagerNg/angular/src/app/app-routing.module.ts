import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewZaerComponent } from './new-zaer/new-zaer.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { NewZaerWithIdComponent } from './new-zaer-with-id/new-zaer-with-id.component';
import { ClockEntryExitComponent } from './clock-entry-exit/clock-entry-exit.component';
import { ZaersComponent } from './zaers/zaers.component';
import { ZaerComponent } from './zaer/zaer.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReportingComponent } from './reporting/reporting.component';
import { UpdateZaerComponent } from './zaer/update-zaer/update-zaer.component';
import { permissionGuard } from '@abp/ng.core';
import { SetExitDateComponent } from './set-exit-date/set-exit-date.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'mokeb-account',
    loadChildren: () =>
      import('./mokeb-manager-account/mokeb-manager-account.module').then(
        m => m.MokebManagerAccountModule
      ),
  },
  {
    path: 'new-zaer',
    component: NewZaerComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ZaerCreate', // policy key for your component
    },
  },
  {
    path: 'new-zaer-id',
    component: NewZaerWithIdComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ZaerCreate', // policy key for your component
    },
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.Reservation', // policy key for your component
    },
  },
  {
    path: 'barcode-scanner',
    component: BarcodeScannerComponent,
  },
  {
    path: 'exit-date',
    component: SetExitDateComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ClockEntryExit', // policy key for your component
    },
  },
  {
    path: 'clock-entry-exit',
    component: ClockEntryExitComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ClockEntryExit', // policy key for your component
    },
  },
  {
    path: 'zaers',
    component: ZaersComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ZaerRead', // policy key for your component
    },
  },
  {
    path: 'zaers/:id',
    component: ZaerComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ZaerRead', // policy key for your component
    },
  },
  {
    path: 'update-zaers/:id',
    component: UpdateZaerComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.ZaerUpdate', // policy key for your component
    },
  },
  {
    path: 'reporting',
    component: ReportingComponent,
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'MokebManagerNg.Reporting', // policy key for your component
    },
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
