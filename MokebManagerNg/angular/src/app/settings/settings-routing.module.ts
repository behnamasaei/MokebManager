import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MokebComponent } from './mokeb/mokeb.component';
import { SettingsComponent } from './settings.component';
import { CreateUpdateMokebComponent } from './create-update-mokeb/create-update-mokeb.component';

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
        
      },
      {
        path: 'create-update-mokeb/:id',
        component: CreateUpdateMokebComponent,
      },
      {
        path: 'create-update-mokeb',
        component: CreateUpdateMokebComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
