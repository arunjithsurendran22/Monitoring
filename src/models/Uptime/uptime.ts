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
  timestamp: { type: Date, required: true },
  metadata: {
    deviceId: { type: String, required: true },
    data: { type: String, required: true },
    timestamp: { type: Number, required: true },
  },
});

const Uptime = mongoose.model<IUptime>('Uptime', UptimeSchema);
export default Uptime;
