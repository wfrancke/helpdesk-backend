import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
