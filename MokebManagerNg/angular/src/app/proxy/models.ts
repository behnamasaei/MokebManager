import type { AggregateRoot } from './volo/abp/domain/entities/models';
import type { Gender } from './gender.enum';
import type { IFormFile } from './microsoft/asp-net-core/http/models';

export interface EntryExitZaer extends AggregateRoot<string> {
  zaerId?: string;
  zaer: Zaer;
  entryDate?: string;
  exitDate?: string;
  mokebId?: string;
}

export interface Mokeb extends AggregateRoot<string> {
  name?: string;
  gender: Gender;
  capacity: number;
  zaers: Zaer[];
  entryExitZaers: EntryExitZaer[];
}

export interface Zaer extends AggregateRoot<string> {
  name?: string;
  family?: string;
  gender: Gender;
  entryExitZaerDates: EntryExitZaer[];
  imageFileName?: string;
  passportNo?: string;
  mokebId?: string;
  mokeb: Mokeb;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}

export interface BlobDto {
  content: number[];
  name?: string;
}

export interface GetBlobRequestDto {
  name: string;
}

export interface SaveBlobInputDto {
  content: number[];
  name: string;
}

export interface UploadFileDto {
  file: IFormFile;
  name: string;
}
