import { Document } from 'mongoose';

export interface Tag extends Document {
  readonly id: string;
  readonly name: string;
}
