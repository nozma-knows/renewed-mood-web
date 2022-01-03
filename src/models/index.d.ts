import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type JournalEntriesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class JournalEntries {
  readonly id: string;
  readonly user: string;
  readonly timestamp: number;
  readonly title?: string;
  readonly entry?: string;
  readonly starred?: boolean;
  readonly shared?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<JournalEntries, JournalEntriesMetaData>);
  static copyOf(source: JournalEntries, mutator: (draft: MutableModel<JournalEntries, JournalEntriesMetaData>) => MutableModel<JournalEntries, JournalEntriesMetaData> | void): JournalEntries;
}