import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateTagDto } from 'src/dto/tag.dto';
import { Tag } from '../interfaces/tag.interface';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_MODEL')
    private tagModel: Model<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    return createdTag.save();
  }
}
