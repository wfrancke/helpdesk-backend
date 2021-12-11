import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: string;
  readonly email: string;
  readonly password: string;
}
