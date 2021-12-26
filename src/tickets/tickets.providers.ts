import { Connection } from 'mongoose';
import { TicketSchema } from 'src/schemas/ticket.schema';

export const ticketsProvider = [
  {
    provide: 'TICKET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Ticket', TicketSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
