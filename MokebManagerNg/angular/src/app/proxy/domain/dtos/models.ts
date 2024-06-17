import type { AuditedEntityDto } from '@abp/ng.core';
import type { EntryExitZaer, Mokeb, Zaer } from '../../models';
import type { Gender } from '../../gender.enum';

export interface EntryExitZaerDto extends AuditedEntityDto<string> {
  zaerId?: string;
  zaer: Zaer;
  entryDate?: string;
  exitDate?: string;
  mokebId?: string;
}

export interface MokebDto extends AuditedEntityDto<string> {
  name?: string;
  gender: Gender;
  capacity: number;
  zaers: Zaer[];
  entryExitZaers: EntryExitZaer[];
}

export interface ZaerDto extends AuditedEntityDto<string> {
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
