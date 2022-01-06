import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requesterId: { type: String, required: true },
  assignedId: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  fillingDate: { type: Date, required: true },
  finishDate: Date,
  tags: { type: [String], required: true },
  comments: [
    {
      content: { type: String, required: true },
      sender: { type: String, required: true },
      date: { type: Date, required: true },
      isPublic: { type: Boolean, required: true },
    },
  ],
});
