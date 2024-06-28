import type { ClockEntryExitDto, CreateUpdateClockEntryExitDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClockEntryExitService {
  apiName = 'Default';
  

  create = (input: CreateUpdateClockEntryExitDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ClockEntryExitDto>({
      method: 'POST',
      url: '/api/app/clock-entry-exit',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/clock-entry-exit/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ClockEntryExitDto>({
      method: 'GET',
      url: `/api/app/clock-entry-exit/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ClockEntryExitDto>>({
      method: 'GET',
      url: '/api/app/clock-entry-exit',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateClockEntryExitDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ClockEntryExitDto>({
      method: 'PUT',
      url: `/api/app/clock-entry-exit/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
