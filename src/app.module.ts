import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsModule } from './users/credentials/credentials.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, CredentialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
