import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  managerId: { type: String, required: true },
});
