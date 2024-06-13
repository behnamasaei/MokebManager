import type { AuditedEntity } from '../../volo/abp/domain/entities/auditing/models';
import type { Gender } from '../../gender.enum';
import type { Mokeb } from '../../models';

export interface EntryExitZaerDto extends AuditedEntity<string> {
  zaerId?: string;
  entryDate?: string;
  exitDate?: string;
}

export interface MokebDto extends AuditedEntity<string> {
  name?: string;
  gender: Gender;
  capacity: number;
}

export interface ZaerDto extends AuditedEntity<string> {
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
