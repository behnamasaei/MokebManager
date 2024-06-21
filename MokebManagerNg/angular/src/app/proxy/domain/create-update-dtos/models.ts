import type { Gender } from '../../gender.enum';

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
  passportNo: string;
  mokebId: string;
  imageFileName?: string;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
