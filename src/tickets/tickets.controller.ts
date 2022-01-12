import {
  Controller,
  Request,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { AddCommentDto } from 'src/dto/ticket.dto';

import { Priority, Status, Ticket } from 'src/interfaces/ticket.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Stat, TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  async getTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('requested')
  async getAllRequested(@Request() req): Promise<Ticket[]> {
    return this.ticketsService.findAllRequested(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('assigned')
  async getAllAssigned(@Request() req): Promise<Ticket[]> {
    return this.ticketsService.findAllAssigned(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('assigned/:id')
  async getAllAssignedFromId(@Param('id') id: string): Promise<Ticket[]> {
    return this.ticketsService.findAllAssigned(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTicket(
    @Request() req,
    @Body()
    postData: {
      title: string;
      description: string;
      priority: Priority;
      tags: string[];
    },
  ): Promise<Ticket> {
    return this.ticketsService.create({
      requesterId: req.user.id,
      ...postData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('details/:id')
  async updateDetails(
    @Param('id') id: string,
    @Body()
    putData: {
      title: string;
      description: string;
      priority: Priority;
      tags: string[];
    },
  ): Promise<Ticket> {
    return this.ticketsService.edit(id, putData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body()
    putData: {
      status: Status;
    },
  ): Promise<Ticket> {
    if (putData.status === Status.Closed) {
      return this.ticketsService.edit(id, {
        finishDate: new Date(),
        ...putData,
      });
    }
    return this.ticketsService.edit(id, {
      finishDate: null,
      ...putData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/comment/:id')
  async addComment(
    @Param('id') id: string,
    @Body()
    putData: AddCommentDto,
  ): Promise<Ticket> {
    return this.ticketsService.addComment(id, putData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/quantity/:status')
  async getOverallQuantityStats(
    @Request() req,
    @Param('status') status: string,
  ): Promise<Stat[]> {
    return this.ticketsService.getTicketsQuantityStats(
      req.user.teamId,
      status === 'open' ? true : false,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/quantity/:status/:prio')
  async getQuantityStats(
    @Request() req,
    @Param('status') status: string,
    @Param('prio') prio: string,
  ): Promise<Stat[]> {
    return this.ticketsService.getTicketsQuantityStats(
      req.user.teamId,
      status === 'open' ? true : false,
      prio as Priority,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/speed')
  async getOverallSpeedStats(@Request() req): Promise<Stat[]> {
    return this.ticketsService.getTicketsSpeedStats(req.user.teamId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/speed/:prio')
  async getSpeedStats(
    @Request() req,
    @Param('prio') prio: string,
  ): Promise<Stat[]> {
    return this.ticketsService.getTicketsSpeedStats(
      req.user.teamId,
      prio as Priority,
    );
  }
}
