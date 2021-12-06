import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type Credentials = any;

@Injectable()
export class CredentialsService {
  private readonly usersCredentials = [
    {
      id: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<Credentials | undefined> {
    return this.usersCredentials.find((user) => user.email === email);
  }
}
