import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZaerService } from '@proxy';
import { ZaerDto } from '@proxy/domain/dtos';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-zaer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './zaer.component.html',
  styleUrl: './zaer.component.scss',
})
export class ZaerComponent {
  zaerId: string | null = null;
  zaer: ZaerDto;

  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute, private zaerService: ZaerService) {}

  ngOnInit(): void {
    this.zaerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getZaerData();
  }

  getZaerData() {
    this.zaerService.getWithDetail(this.zaerId).subscribe(x => {
      this.zaer = x;
    });
  }

  convertUtcToJalali(utcTime: string): string {
    var moment = require('moment-jalaali');
    moment().format('jYYYY/jMM/jDD HH:mm:ss');

    // Convert UTC time to Jalali time
    const jalaliTime = moment(utcTime).format('jYYYY/jMM/jDD HH:mm:ss');
    return jalaliTime;
  }
}
