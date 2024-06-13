import type { Entity } from '../../volo/abp/domain/entities/models';
import type { Gender } from '../../gender.enum';

export interface CreateUpdateEntryExitZaerDto extends Entity<string> {
  zaerId?: string;
  entryDate?: string;
  exitDate?: string;
}

export interface CreateUpdateMokebDto extends Entity<string> {
  name?: string;
  gender: Gender;
  capacity: number;
}

export interface CreateUpdateZaerDto extends Entity<string> {
  name?: string;
  family?: string;
  gender: Gender;
  imageAddress?: string;
  passportNo?: string;
  mokebId?: string;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
