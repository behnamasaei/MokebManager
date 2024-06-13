import type { FullAuditedAggregateRoot } from './volo/abp/domain/entities/auditing/models';
import type { Gender } from './gender.enum';

export interface EntryExitZaer extends FullAuditedAggregateRoot<string> {
  zaerId?: string;
  zaer: Zaer;
  entryDate?: string;
  exitDate?: string;
}

export interface Mokeb extends FullAuditedAggregateRoot<string> {
  name?: string;
  gender: Gender;
  capacity: number;
  zaers: Zaer[];
}

export interface Zaer extends FullAuditedAggregateRoot<string> {
  name?: string;
  family?: string;
  gender: Gender;
  entryExitZaerDates: EntryExitZaer[];
  imageAddress?: string;
  passportNo?: string;
  mokebId?: string;
  mokeb: Mokeb;
  phoneNumber?: number;
  state?: string;
  city?: string;
  address?: string;
}
