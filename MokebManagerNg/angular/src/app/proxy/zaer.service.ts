import type { ZaerDto } from './domain/dtos/models';
import type { CreateZaerDto, UpdateZaerDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZaerService {
  apiName = 'Default';
  

  create = (input: CreateZaerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto>({
      method: 'POST',
      url: '/api/app/zaer',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createNewWithId = (input: CreateZaerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto>({
      method: 'POST',
      url: '/api/app/zaer/new-with-id',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/zaer/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto>({
      method: 'GET',
      url: `/api/app/zaer/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ZaerDto>>({
      method: 'GET',
      url: '/api/app/zaer',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListWithDetail = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ZaerDto>>({
      method: 'GET',
      url: '/api/app/zaer/with-detail',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getSearch = (text: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto[]>({
      method: 'GET',
      url: '/api/app/zaer/search',
      params: { text },
    },
    { apiName: this.apiName,...config });
  

  getWithDetail = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto>({
      method: 'GET',
      url: `/api/app/zaer/${id}/with-detail`,
    },
    { apiName: this.apiName,...config });
  

  getWithPassportNo = (passportNo: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto>({
      method: 'GET',
      url: '/api/app/zaer/with-passport-no',
      params: { passportNo },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateZaerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ZaerDto>({
      method: 'PUT',
      url: `/api/app/zaer/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
