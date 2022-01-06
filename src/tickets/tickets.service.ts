import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  CreateTicketDto,
  EditTicketDto,
  AddCommentDto,
} from 'src/dto/ticket.dto';
import { Ticket, Status } from 'src/interfaces/ticket.interface';
import { UsersService } from 'src/users/users.service';

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
      assignedId: await this.assign(createTicketDto.tags),
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

  async assign(tags: string[]): Promise<string> {
    const employees = await this.userService.findEmployees();
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
}
