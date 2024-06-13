import type { AggregateRoot } from '../models';
import type { TKey } from '../../../../../models';

export interface AuditedAggregateRoot<TKey> extends CreationAuditedAggregateRoot<TKey> {
  lastModificationTime?: string;
  lastModifierId?: string;
}

export interface CreationAuditedAggregateRoot<TKey> extends AggregateRoot<TKey> {
  creationTime?: string;
  creatorId?: string;
}

export interface FullAuditedAggregateRoot<TKey> extends AuditedAggregateRoot<TKey> {
  isDeleted: boolean;
  deleterId?: string;
  deletionTime?: string;
}
