import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';

import { Tag } from 'src/interfaces/tag.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTags(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Post()
  async createTag(
    @Body()
    postData: {
      name: string;
    },
  ): Promise<Tag> {
    return this.tagsService.create(postData);
  }
}
