import { Schema, model, Model } from "mongoose";
import { IAnalytics } from "./analytics-model";

const AnalyticsSchema: Schema<IAnalytics> = new Schema<IAnalytics>({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    deviceId: {
      type: String,
      required: true,
    },
    data: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
});

const ANALYTICS: Model<IAnalytics> = model<IAnalytics>("Analytics", AnalyticsSchema);

export default ANALYTICS;
