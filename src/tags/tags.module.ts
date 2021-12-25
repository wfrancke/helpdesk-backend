import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TagsController } from './tags.controller';
import { tagsProviders } from './tags.providers';
import { TagsService } from './tags.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [TagsService, ...tagsProviders],
  exports: [TagsService],
})
export class TagsModule {}
