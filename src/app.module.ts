import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [AuthModule, UsersModule, TeamsModule],
})
export class AppModule {}
