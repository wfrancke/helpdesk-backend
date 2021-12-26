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

import { Priority, Status, Ticket } from 'src/interfaces/ticket.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TicketsService } from './tickets.service';

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
    return this.ticketsService.edit(id, putData);
  }
}
