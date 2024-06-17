import type { Gender } from '../../gender.enum';
import type { Gender } from '../../models';
import type { IFormFile } from '../../microsoft/asp-net-core/http/models';

export interface CreateUpdateEntryExitZaerDto {
  zaerId?: string;
  entryDate?: string;
  exitDate?: string;
  mokebId?: string;
}

export interface CreateUpdateMokebDto {
  name?: string;
  gender: Gender;
  capacity: number;
}

export interface CreateUpdateZaerDto {
  name?: string;
  family?: string;
  gender: Gender;
  passportNo?: string;
  mokebId?: string;
  image: IFormFile;
  imageAddress?: string;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
