import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/settings/mokeb',
        name: '::MokebSettings',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/new-zaer',
        name: '::NewZaer',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/new-zaer-id',
        name: '::NewZaerWithId',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/reservation',
        name: '::ExtensionOfReservation',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/clock-entry-exit',
        name: '::SaveEntryExitClock',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/zaers',
        name: '::Zaers',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },

      {
        path: '/reporting',
        name: 'گزارشگیری',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/exit-date',
        name: 'ثبت خروج',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },{
        path: '/program-helper',
        name: 'راهنمای برنامه',
        iconClass: 'fas fa-cogs',
        order: 50,
        layout: eLayoutType.application,
      },
    ]);
  };
}
