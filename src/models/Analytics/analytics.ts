import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  timestamp: Date;
  metadata: {
    deviceId: string;
    data: 0 | 1;
    timestamp: number;
  };
}

const AnalyticsSchema: Schema = new Schema({
  timestamp: { type: Date, required: true },
  metadata: {
    deviceId: { type: String, required: true },
    data: { type: Number, required: true },
    timestamp: { type: Number, required: true },
  },
});

const Analytics = mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
export default Analytics;
