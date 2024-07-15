import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EntryExitZaerService, MokebService } from '@proxy';
import { MokebDto } from '@proxy/domain/dtos';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss',
})
export class ReportingComponent {
  rangeDates: any;
  mokebData: any;
  mokebFreeCapacityData: any;
  mokebReserveInRangeData: any;
  basicOptions: any;
  mokebName: string[] = [];
  mokebCapacity: number[] = [];
  mokebFreeNightName: string[] = [];
  mokebFreeNightCapacity: number[] = [];
  mokebReserveInRangeDataName: string[] = [];
  mokebReserveInRangeDataCapacity: number[] = [];
  /**
   *
   */
  constructor(
    private mokebService: MokebService,
    private entryExitService: EntryExitZaerService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('مدیریت موکب | گزارشگیری');
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.mokebService.getMokebCapacityToNight().subscribe(mokeb => {
      mokeb.forEach(item => {
        this.mokebFreeNightName.push(item.mokeb.name);
        this.mokebFreeNightCapacity.push(item.freeCapacityToNight);
      });

      this.mokebFreeCapacityData = {
        labels: this.mokebFreeNightName,
        datasets: [
          {
            label: 'ظرفیت خالی امشب موکب ها',
            data: this.mokebFreeNightCapacity,

            borderWidth: 1,
          },
        ],
      };
    });

    this.mokebService.getAllList().subscribe(mokeb => {
      mokeb.items.forEach(item => {
        this.mokebName.push(item.name);
        this.mokebCapacity.push(item.capacity);
      });

      this.mokebData = {
        labels: this.mokebName,
        datasets: [
          {
            label: 'ظرفیت موکب ها',
            data: this.mokebCapacity,

            borderWidth: 1,
          },
        ],
      };
    });

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  searchInRangeDate() {
    if (!this.rangeDates) return;

    const mokebName: string[] = [];
    const mokebReservation: number[] = [];

    this.mokebService.getAllList().subscribe(mokebs => {
      const mokebData: MokebDto[] = mokebs.items;
      mokebData.forEach(item => {
        mokebName.push(item.name);
      });

      this.entryExitService.getAllEntryExit().subscribe(entryExits => {
        mokebData.forEach(item => {
          const selectedEntryExit = entryExits.filter(x => x.mokebId === item.id);
          const reservationCount = selectedEntryExit.filter(x => {
            const entryDate = new Date(x.entryDate);
            const exitDate = new Date(x.exitDate);
            return this.rangeDates[0] <= entryDate && this.rangeDates[1] >= exitDate;
          }).length;

          mokebReservation.push(reservationCount);
        });

        const backgroundColor = mokebName.map(() => this.getRandomColor(0.2));
        const borderColor = mokebName.map(() => this.getRandomColor());

        this.mokebReserveInRangeData = {
          labels: mokebName,
          datasets: [
            {
              label: 'First Dataset',
              data: mokebReservation,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        };
      });
    });
  }

  getRandomColor(opacity: number = 1): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
