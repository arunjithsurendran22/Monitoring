import { Document } from "mongoose";

export interface IAnalytics extends Document {
  timestamp: Date;
  metadata: {
    deviceId: string;
    data: 0 | 1;
    timestamp: number; // Time in milliseconds
  };
}

export interface IAnalyticsResult {
  _id: { hour: number };
  count: number;
  data0: number;
  data1: number;
}
