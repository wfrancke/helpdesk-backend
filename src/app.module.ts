import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { TagsModule } from './tags/tags.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [AuthModule, UsersModule, TeamsModule, TagsModule, TicketsModule],
})
export class AppModule {}
