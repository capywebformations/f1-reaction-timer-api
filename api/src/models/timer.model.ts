import mongoose, { Schema, Document } from 'mongoose';

export interface ITimer extends Document {
  user_id: mongoose.Types.ObjectId;
  time: number;
}

const TimerSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true },
});

export default mongoose.model<ITimer>('Timer', TimerSchema);
