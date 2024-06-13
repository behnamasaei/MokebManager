import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MokebComponent } from './mokeb/mokeb.component';

const routes: Routes = [
  {
    path: 'mokeb',
    component: MokebComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
