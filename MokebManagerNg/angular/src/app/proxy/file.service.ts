import type { BlobDto, GetBlobRequestDto, SaveBlobInputDto, UploadFileDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  apiName = 'Default';

  getBlob = (input: GetBlobRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>(
      {
        method: 'GET',
        url: '/api/app/file/blob',
        params: { name: input.name },
      },
      { apiName: this.apiName, ...config }
    );

  saveBlob = (input: SaveBlobInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/app/file/save-blob',
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  saveBlobStream = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>(
      {
        method: 'POST',
        responseType: 'text',
        url: '/api/app/file/save-blob-stream',
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  constructor(private restService: RestService) {}
}
