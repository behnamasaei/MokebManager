import type { CreateUpdateMokebStateDto, MokebStateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MokebStateService {
  apiName = 'Default';
  

  create = (input: CreateUpdateMokebStateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebStateDto>({
      method: 'POST',
      url: '/api/app/mokeb-state',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/mokeb-state/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebStateDto>({
      method: 'GET',
      url: `/api/app/mokeb-state/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebStateDto[]>({
      method: 'GET',
      url: '/api/app/mokeb-state/list',
    },
    { apiName: this.apiName,...config });
  

  getFreeState = (MokebId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'GET',
      url: `/api/app/mokeb-state/free-state/${MokebId}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<MokebStateDto>>({
      method: 'GET',
      url: '/api/app/mokeb-state',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListWithDetail = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebStateDto[]>({
      method: 'GET',
      url: '/api/app/mokeb-state/with-detail',
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateMokebStateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MokebStateDto>({
      method: 'PUT',
      url: `/api/app/mokeb-state/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
