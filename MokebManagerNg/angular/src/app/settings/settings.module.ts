import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MokebComponent } from './mokeb/mokeb.component';

@NgModule({
  declarations: [
    MokebComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule, 
  ],
})
export class SettingsModule {}
