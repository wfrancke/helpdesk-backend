import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TeamsController } from './teams.controller';
import { teamsProviders } from './teams.providers';
import { TeamsService } from './teams.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TeamsController],
  providers: [TeamsService, ...teamsProviders],
  exports: [TeamsService],
})
export class TeamsModule {}
