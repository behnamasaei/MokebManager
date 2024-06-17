import type { AggregateRoot } from './volo/abp/domain/entities/models';
import type { Gender } from './gender.enum';

export interface EntryExitZaer extends AggregateRoot<string> {
  zaerId?: string;
  zaer: Zaer;
  entryDate?: string;
  exitDate?: string;
  mokebId?: string;
}

export interface Mokeb extends AggregateRoot<string> {
  name?: string;
  gender: Gender;
  capacity: number;
  zaers: Zaer[];
  entryExitZaers: EntryExitZaer[];
}

export interface Zaer extends AggregateRoot<string> {
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
