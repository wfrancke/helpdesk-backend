import { Document } from 'mongoose';

export enum Role {
  User = 'user',
  Employee = 'employee',
  Manager = 'manager',
}

export interface User extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
  readonly phoneNumber: string;
}
