import mongoose, { Schema, Document } from 'mongoose';

export interface IUptime extends Document {
  timestamp: Date;
  metadata: {
    deviceId: string;
    data: 'connected' | 'disconnected';
    timestamp: number;
  };
}

const UptimeSchema: Schema = new Schema({
  timestamp: { type: Date, required: false },
  metadata: {
    deviceId: { type: String, required: false },
    data: { type: String, required: false },
    timestamp: { type: Number, required: false },
  },
});

const Uptime = mongoose.model<IUptime>('Uptime', UptimeSchema);
export default Uptime;
