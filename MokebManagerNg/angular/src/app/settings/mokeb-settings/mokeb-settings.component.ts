import { Environment } from '@abp/ng.core';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-mokeb-settings',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './mokeb-settings.component.html',
  styleUrl: './mokeb-settings.component.scss',
})
export class MokebSettingsComponent {
  genderMokebOptions: any[] = [
    { label: 'مرد', value: 'Male' },
    { label: 'زن', value: 'Female' },
  ];
  genderMokebValue: string;
  /**
   *
   */
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (environment.mokebGenderReseption === 'Male') {
      this.genderMokebValue = this.genderMokebOptions[0].value;
    } else if (environment.mokebGenderReseption === 'Female') {
      this.genderMokebValue = this.genderMokebOptions[1].value;
    }
  }

  changeGenderMokeb() {
    environment.mokebGenderReseption = this.genderMokebValue;
  }
}
