import type { CreateUpdateEntryExitZaerDto } from './domain/create-update-dtos/models';
import type { EntryExitZaerDto } from './domain/dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntryExitZaerService {
  apiName = 'Default';
  

  create = (input: CreateUpdateEntryExitZaerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntryExitZaerDto>({
      method: 'POST',
      url: '/api/app/entry-exit-zaer',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/entry-exit-zaer/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntryExitZaerDto>({
      method: 'GET',
      url: `/api/app/entry-exit-zaer/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllEntryExit = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntryExitZaerDto[]>({
      method: 'GET',
      url: '/api/app/entry-exit-zaer/entry-exit',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EntryExitZaerDto>>({
      method: 'GET',
      url: '/api/app/entry-exit-zaer',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateEntryExitZaerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntryExitZaerDto>({
      method: 'PUT',
      url: `/api/app/entry-exit-zaer/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
