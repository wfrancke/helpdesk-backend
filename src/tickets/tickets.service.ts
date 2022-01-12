import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  CreateTicketDto,
  EditTicketDto,
  AddCommentDto,
} from 'src/dto/ticket.dto';
import { Ticket, Status, Priority } from 'src/interfaces/ticket.interface';
import { UsersService } from 'src/users/users.service';

export interface Stat {
  name: string;
  value: string;
}

@Injectable()
export class TicketsService {
  constructor(
    @Inject('TICKET_MODEL')
    private ticketModel: Model<Ticket>,
    private userService: UsersService,
  ) {}

  async findById(id: string): Promise<Ticket> {
    return this.ticketModel.findById(id);
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel({
      assignedId: await this.assign(
        createTicketDto.requesterId,
        createTicketDto.tags,
      ),
      fillingDate: new Date(),
      status: Status.Open,
      ...createTicketDto,
    });
    return createdTicket.save();
  }

  async findAllRequested(id: string): Promise<Ticket[]> {
    return this.ticketModel.find({ requesterId: id }).exec();
  }

  async findAllAssigned(id: string): Promise<Ticket[]> {
    return this.ticketModel.find({ assignedId: id }).exec();
  }

  async edit(id: string, editTicketDto: EditTicketDto): Promise<Ticket> {
    const updatedTicket = await this.ticketModel.findByIdAndUpdate(
      id,
      editTicketDto,
    );
    return updatedTicket.save();
  }

  match(specs: string[], tags: string[]): number {
    let counter = 0;
    specs.forEach((spec) => tags.some((tag) => tag === spec) && counter++);
    return counter;
  }

  async assign(requesterId: string, tags: string[]): Promise<string> {
    const employees = await this.userService.findEmployees(requesterId);
    let assignee = employees[Math.floor(Math.random() * employees.length)];
    employees.forEach((emp) => {
      if (
        this.match(emp.specialty, tags) > this.match(assignee.specialty, tags)
      ) {
        assignee = emp;
      }
    });
    return assignee.id;
  }

  async addComment(
    ticketId: string,
    addCommentDto: AddCommentDto,
  ): Promise<Ticket> {
    const updatedTicket = await this.ticketModel.findById(ticketId);
    updatedTicket.comments.push(addCommentDto);
    return updatedTicket.save();
  }

  async getTicketsQuantityStats(
    teamId: string,
    isOpen: boolean,
    priority?: Priority,
  ): Promise<Stat[]> {
    const stats: Stat[] = [];
    const employees = await this.userService.findTeamMembers(teamId);
    for (const emp of employees) {
      const tickets = priority
        ? await this.ticketModel.find({
            assignedId: emp._id,
            status: isOpen ? Status.Open : Status.Closed,
            priority: priority,
          })
        : await this.ticketModel.find({
            assignedId: emp._id,
            status: isOpen ? Status.Open : Status.Closed,
          });
      stats.push({
        name: `${emp.firstName} ${emp.lastName}`,
        value: tickets.length.toString(),
      });
    }
    return stats;
  }

  getTicketRealizationAverage(tickets: Ticket[]): string {
    let time = 0;
    tickets.forEach((ticket) => {
      time +=
        (ticket.finishDate.getTime() - ticket.fillingDate.getTime()) /
        (1000 * 60 * 60 * 24);
    });
    return (time / tickets.length).toFixed(1);
  }

  async getTicketsSpeedStats(
    teamId: string,
    priority?: Priority,
  ): Promise<Stat[]> {
    const stats: Stat[] = [];
    const employees = await this.userService.findTeamMembers(teamId);
    for (const emp of employees) {
      const tickets = priority
        ? await this.ticketModel.find({
            assignedId: emp._id,
            status: Status.Closed,
            priority: priority,
          })
        : await this.ticketModel.find({
            assignedId: emp._id,
            status: Status.Closed,
          });
      stats.push({
        name: `${emp.firstName} ${emp.lastName}`,
        value: this.getTicketRealizationAverage(tickets),
      });
    }
    return stats;
  }
}
