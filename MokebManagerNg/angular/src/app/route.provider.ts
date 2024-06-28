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
        name: 'زائر جدید با شناسه',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/barcode-scanner',
        name: 'اسکنر',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/clock-entry-exit',
        name: 'ثبت ساعت عبور',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/zaers',
        name: 'زائرین',
        iconClass: 'fas fa-cogs',
        order: 2,
        layout: eLayoutType.application,
      },
    ]);
  };
}
