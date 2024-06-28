import type { AuditedEntityDto } from '@abp/ng.core';
import type { Gender } from '../../gender.enum';
import { ClockEntryExitDto } from '@proxy/models';

export interface MokebDto extends AuditedEntityDto<string> {
  name?: string;
  gender: Gender;
  capacity: number;
}

export interface EntryExitZaerDto extends AuditedEntityDto<string> {
  zaerId?: string;
  entryDate?: string;
  exitDate?: string;
  mokebId?: string;
}

export interface ZaerDto extends AuditedEntityDto<string> {
  name?: string;
  family?: string;
  gender: Gender;
  entryExitZaerDates: EntryExitZaerDto[];
  clockEntryExits: ClockEntryExitDto[];
  imageFileName?: string;
  passportNo?: string;
  mokebId?: string;
  mokeb: MokebDto;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
