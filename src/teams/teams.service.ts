import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Team } from '../interfaces/team.interface';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TEAM_MODEL')
    private teamModel: Model<Team>,
  ) {}

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }
}
