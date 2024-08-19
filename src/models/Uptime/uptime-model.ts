import { Document } from "mongoose";

export interface IUptime extends Document {
  timestamp: Date;
  metadata: {
    deviceId: string;
    data: 'connected' | 'disconnected';
    timestamp: number; // Time in milliseconds
    duration?: number; // Duration in milliseconds (optional)
  };
}
