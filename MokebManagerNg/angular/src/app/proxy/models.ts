import type { MokebDto } from './domain/dtos/models';
import type { IFormFile } from './microsoft/asp-net-core/http/models';

export interface BlobDto {
  content: number[];
  name?: string;
}

export interface GetBlobRequestDto {
  name: string;
}

export interface MokebCapacityDto {
  mokebId?: string;
  mokeb: MokebDto;
  freeCapacityToNight: number;
}

export interface SaveBlobInputDto {
  content: number[];
  name: string;
}

export interface UploadFileDto {
  file: IFormFile;
  name: string;
}
