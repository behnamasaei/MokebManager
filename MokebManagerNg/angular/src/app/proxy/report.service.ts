import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  apiName = 'Default';
  

  generateReport = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/report/generate-report',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
