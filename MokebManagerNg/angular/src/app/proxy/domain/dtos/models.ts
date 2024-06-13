import type { EntityDto } from '@abp/ng.core';
import type { Gender } from '../../gender.enum';
import type { Mokeb } from '../../models';

export interface EntryExitZaerDto extends EntityDto<string> {
  zaerId?: string;
  entryDate?: string;
  exitDate?: string;
}

export interface MokebDto extends EntityDto<string> {
  name?: string;
  gender: Gender;
  capacity: number;
}

export interface ZaerDto extends EntityDto<string> {
  name?: string;
  family?: string;
  gender: Gender;
  entryExitZaerDates: EntryExitZaerDto[];
  imageAddress?: string;
  passportNo?: string;
  mokebId?: string;
  mokeb: Mokeb;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
