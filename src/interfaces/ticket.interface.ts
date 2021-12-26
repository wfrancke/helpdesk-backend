import { Document } from 'mongoose';

export enum Status {
  Open = 'open',
  Closed = 'closed',
}

export enum Priority {
  Low = 'low',
  High = 'high',
  Critical = 'critical',
}

export interface Ticket extends Document {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly requesterId: string;
  readonly assignedId: string;
  readonly priority: Priority;
  readonly status: Status;
  readonly fillingDate: Date;
  readonly finishDate: Date;
  readonly tags: string[];
}
