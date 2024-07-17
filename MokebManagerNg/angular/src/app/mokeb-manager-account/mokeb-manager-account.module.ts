import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MokebManagerAccountRoutingModule } from './mokeb-manager-account-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, MokebManagerAccountRoutingModule],
})
export class MokebManagerAccountModule {}
