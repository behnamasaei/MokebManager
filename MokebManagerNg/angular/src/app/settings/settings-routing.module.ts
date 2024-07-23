import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MokebComponent } from './mokeb/mokeb.component';
import { SettingsComponent } from './settings.component';
import { CreateUpdateMokebComponent } from './create-update-mokeb/create-update-mokeb.component';
import { permissionGuard } from '@abp/ng.core';
import { MokebSettingsComponent } from './mokeb-settings/mokeb-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/settings', // Redirect to settings by default
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'mokeb',
        component: MokebComponent,
        // canActivate: [permissionGuard],
        // data: {
        //   requiredPolicy: 'MokebManagerNg.MokebRead', // policy key for your component
        // },
      },
      {
        path: 'create-update-mokeb/:id',
        component: CreateUpdateMokebComponent,
        // canActivate: [permissionGuard],
        // data: {
        //   requiredPolicy: 'MokebManagerNg.MokebUpdate', // policy key for your component
        // },
      },
      {
        path: 'create-update-mokeb',
        component: CreateUpdateMokebComponent,
        // canActivate: [permissionGuard],
        // data: {
        //   requiredPolicy: 'MokebManagerNg.MokebCreate', // policy key for your component
        // },
      },
      {
        path: 'mokeb-settings',
        component: MokebSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
