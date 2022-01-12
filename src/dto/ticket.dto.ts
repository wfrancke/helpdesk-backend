import { Priority, Status } from 'src/interfaces/ticket.interface';

export interface CreateTicketDto {
  title: string;
  description: string;
  requesterId: string;
  priority: Priority;
  tags: string[];
  assignedId?: string;
}

export interface EditTicketDto {
  title?: string;
  description?: string;
  priority?: Priority;
  tags?: string[];
  status?: Status;
  finishDate?: Date;
  assignedId?: string;
}

export interface AddCommentDto {
  content: string;
  date: Date;
  sender: string;
  isPublic: boolean;
}
