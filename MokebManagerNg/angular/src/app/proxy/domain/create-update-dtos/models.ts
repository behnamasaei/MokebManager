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
