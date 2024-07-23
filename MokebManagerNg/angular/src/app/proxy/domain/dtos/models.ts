import type { AuditedEntityDto } from '@abp/ng.core';
import type { Gender } from '../../gender.enum';
import type { ClockEntryExitDto, MokebStateDto } from '../../models';

export interface EntryExitZaerDto extends AuditedEntityDto<string> {
  zaerId?: string;
  entryDate?: string;
  exitDate?: string;
  mokebId?: string;
}

export interface MokebDto extends AuditedEntityDto<string> {
  name?: string;
  gender: Gender;
  capacity: number;
  address?: string;
  location?: string;
  zaers: ZaerDto[];
  entryExitZaers: EntryExitZaerDto[];
  mokebStates: MokebStateDto[];
}

export interface ZaerDto extends AuditedEntityDto<string> {
  name?: string;
  gender: Gender;
  entryExitZaerDates: EntryExitZaerDto[];
  clockEntryExits: ClockEntryExitDto[];
  mokebState: MokebStateDto;
  passportNo?: string;
  mokebId?: string;
  mokeb: MokebDto;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
