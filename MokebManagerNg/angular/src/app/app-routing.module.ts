import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewZaerComponent } from './new-zaer/new-zaer.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { NewZaerWithIdComponent } from './new-zaer-with-id/new-zaer-with-id.component';
import { ClockEntryExitComponent } from './clock-entry-exit/clock-entry-exit.component';
import { ZaersComponent } from './zaers/zaers.component';
import { ZaerComponent } from './zaer/zaer.component';
import { ReservationComponent } from './reservation/reservation.component';

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
    path: 'new-zaer',
    component: NewZaerComponent,
  },
  {
    path: 'new-zaer-id',
    component: NewZaerWithIdComponent,
  },
  {
    path: 'reservation',
    component: ReservationComponent,
  },
  {
    path: 'barcode-scanner',
    component: BarcodeScannerComponent,
  },
  {
    path: 'clock-entry-exit',
    component: ClockEntryExitComponent,
  },
  {
    path: 'zaers',
    component: ZaersComponent,
  },
  {
    path: 'zaers/:id',
    component: ZaerComponent,
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
