import { Document } from 'mongoose';

export interface Team extends Document {
  readonly id: string;
  readonly name: string;
  readonly managerId: string;
}
