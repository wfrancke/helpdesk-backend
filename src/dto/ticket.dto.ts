import { Priority, Status } from 'src/interfaces/ticket.interface';

export interface CreateTicketDto {
  title: string;
  description: string;
  requesterId: string;
  priority: Priority;
  tags: string[];
}

export interface EditTicketDto {
  title?: string;
  description?: string;
  priority?: Priority;
  tags?: string[];
  status?: Status;
}
