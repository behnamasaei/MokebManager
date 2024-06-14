export interface AggregateRoot<TKey> extends BasicAggregateRoot<TKey> {
  extraProperties: Record<string, object>;
  concurrencyStamp?: string;
}

export interface BasicAggregateRoot<TKey> extends Entity<TKey> {}

export interface Entity<TKey> {
  id: TKey;
  // Add other common properties for Entity if needed
}
