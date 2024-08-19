import { Schema, model, Model } from "mongoose";
import { IUptime } from "./uptime-model";

const UptimeSchema: Schema<IUptime> = new Schema<IUptime>({
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
      type: String,
      enum: ["connected", "disconnected"],
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // Optional field for duration
      required: false,
    },
  },
});

const UPTIME: Model<IUptime> = model<IUptime>("Uptime", UptimeSchema);

export default UPTIME;
