import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { TicketsController } from './tickets.controller';
import { ticketsProvider } from './tickets.providers';
import { TicketsService } from './tickets.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [TicketsController],
  providers: [TicketsService, ...ticketsProvider],
  exports: [TicketsService],
})
export class TicketsModule {}
