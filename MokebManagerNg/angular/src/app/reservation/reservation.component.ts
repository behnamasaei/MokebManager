import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { EntryExitZaerService, ZaerService } from '@proxy';
import { CreateUpdateEntryExitZaerDto } from '@proxy/domain/create-update-dtos';
import * as moment from 'moment';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  providers: [MessageService],
})
export class ReservationComponent {
  scanResult: string | null = null;
  scanShow: boolean = false;
  entryExitOptions: any[] = [];
  selectedEntryExit;

  /**
   *
   */
  constructor(
    private entryExitService: EntryExitZaerService,
    private zaerService: ZaerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.entryExitOptions = [
      { name: '1 شب', key: '1' },
      { name: '2 شب', key: '2' },
      { name: '3 شب', key: '3' },
    ];
    this.selectedEntryExit = this.entryExitOptions[0];
  }

  save() {
    const entryDate = this.getEntryDate();
    const exitDate = this.getExitDate(this.selectedEntryExit.key);

    this.zaerService.get(this.scanResult).subscribe(zaer => {
      const input: CreateUpdateEntryExitZaerDto = {
        zaerId: zaer.id,
        entryDate: entryDate,
        exitDate: exitDate,
        mokebId: zaer.mokebId,
      };
      this.entryExitService.create(input).subscribe(x => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Success',
          life: 1000,
        });

        this.scanResult = null;
        this.selectedEntryExit = this.entryExitOptions[0];
      });
    });
  }

  getEntryDate(): string {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  getExitDate(exitDate: number): string {
    const exitDaysAfter = moment.utc().add(exitDate, 'days').format('YYYY-MM-DDT11:00:00.000[Z]'); // Two days after current UTC date

    return exitDaysAfter;
  }

  isValidGuid(): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(this.scanResult);
  }
}
