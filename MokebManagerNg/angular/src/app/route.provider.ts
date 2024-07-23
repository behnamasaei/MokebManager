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
        path: '/new-zaer',
        name: '::NewZaer',
        iconClass: 'pi pi-user-plus',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/new-zaer-id',
        name: '::NewZaerWithId',
        iconClass: 'pi pi-qrcode',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: '/reservation',
        name: 'تمدید پذیرش',
        iconClass: 'pi pi-calendar-plus',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/clock-entry-exit',
        name: '::SaveEntryExitClock',
        iconClass: 'pi pi-clock',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/zaers',
        name: '::Zaers',
        iconClass: 'pi pi-users',
        order: 2,
        layout: eLayoutType.application,
      },

      {
        path: '/reporting',
        name: 'گزارشگیری',
        iconClass: 'pi pi-file',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/exit-date',
        name: 'ثبت خروج',
        iconClass: 'pi pi-calendar-minus',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/settings/mokeb',
        name: 'مدیریت موکب ها',
        iconClass: 'pi pi-building',
        order: 48,
        layout: eLayoutType.application,
      },
      {
        path: '/settings/mokeb-settings',
        name: 'تنظیمات',
        iconClass: 'pi pi-building',
        order: 49,
        layout: eLayoutType.application,
      },
      {
        path: '/program-helper',
        name: 'راهنمای برنامه',
        iconClass: 'pi pi-question',
        order: 50,
        layout: eLayoutType.application,
      },
      ,
      {
        path: '/about-us',
        name: 'درباره ما',
        iconClass: 'pi pi-phone',
        order: 51,
        layout: eLayoutType.application,
      },
    ]);
  };
}
