import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MokebService } from '@proxy';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss',
})
export class ReportingComponent {
  mokebData: any;
  mokebFreeCapacityData: any;
  basicOptions: any;
  mokebName: string[] = [];
  mokebCapacity: number[] = [];
  mokebFreeNightName: string[] = [];
  mokebFreeNightCapacity: number[] = [];
  /**
   *
   */
  constructor(private mokebService: MokebService) {}

  ngOnInit() {
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
}
