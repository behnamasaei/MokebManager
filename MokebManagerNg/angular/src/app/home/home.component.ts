import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent {
  tooltipItems: MenuItem[] | undefined;

  leftTooltipItems: MenuItem[] | undefined;

  /**
   *
   */
  constructor(private authService: AuthService, private messageService: MessageService) {}

  ngOnInit() {
    this.tooltipItems = [
      {
        tooltipOptions: {
          tooltipLabel: 'Add',
        },
        icon: 'pi pi-pencil',
        command: () => {},
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Update',
        },
        icon: 'pi pi-refresh',
        command: () => {},
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Delete',
        },
        icon: 'pi pi-trash',
        command: () => {},
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Upload',
        },
        icon: 'pi pi-upload',
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Angular Website',
        },
        icon: 'pi pi-external-link',
        url: 'http://angular.io',
      },
    ];

    this.leftTooltipItems = [
      {
        tooltipOptions: {
          tooltipLabel: 'Add',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-pencil',
        command: () => {},
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Update',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-refresh',
        command: () => {},
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Delete',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-trash',
        command: () => {},
      },
      {
        icon: 'pi pi-upload',
        tooltipOptions: {
          tooltipLabel: 'Upload',
          tooltipPosition: 'left',
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Angular Website',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-external-link',
        url: 'http://angular.io',
      },
    ];
  }

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  login() {
    this.authService.navigateToLogin();
  }
}
