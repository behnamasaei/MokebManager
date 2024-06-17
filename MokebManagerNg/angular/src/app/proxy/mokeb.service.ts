import type { CreateUpdateMokebDto } from './domain/create-update-dtos/models';
import type { MokebDto } from './domain/dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MokebService {
  apiName = 'Default';
  

  create = (input: CreateUpdateMokebDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebDto>({
      method: 'POST',
      url: '/api/app/mokeb',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/mokeb/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebDto>({
      method: 'GET',
      url: `/api/app/mokeb/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<MokebDto>>({
      method: 'GET',
      url: '/api/app/mokeb/list',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<MokebDto>>({
      method: 'GET',
      url: '/api/app/mokeb',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateMokebDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebDto>({
      method: 'PUT',
      url: `/api/app/mokeb/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
