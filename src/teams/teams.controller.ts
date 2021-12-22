import { Controller, UseGuards, Get } from '@nestjs/common';
import { Team } from 'src/interfaces/team.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamsService.findAll();
  }
}
