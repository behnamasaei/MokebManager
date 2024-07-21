import type { ZaerDto } from './domain/dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  apiName = 'Default';
  

  generateCardZaer = (zaer: ZaerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/report/generate-card-zaer',
      body: zaer,
    },
    { apiName: this.apiName,...config });
  

  generateReport = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/report/generate-report',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
