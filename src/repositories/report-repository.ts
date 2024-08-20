import ANALYTICS from "../models/Analytics/analytics";
import { IAnalyticsResult } from "../models/Analytics/analytics-model";
import UPTIME from "../models/Uptime/uptime";
import { IUptime } from "../models/Uptime/uptime-model";

const getAnalyticsDataRepo = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<IAnalyticsResult[]> => {
  return ANALYTICS.aggregate([
    {
      $match: {
        "metadata.deviceId": deviceId,
        timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$timestamp" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.day": 1 } },
  ]);
};

/**
 * Get uptime data for a given device and date range.
 * @param deviceId - The ID of the device.
 * @param startDate - The start date for the query.
 * @param endDate - The end date for the query.
 * @returns A promise that resolves to uptime data.
 */
const getUptimeDataRepo = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<IUptime[]> => {
  return UPTIME.find({
    "metadata.deviceId": deviceId,
    timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
  })
    .sort({ timestamp: 1 })
    .exec();
};

export default {
  getAnalyticsDataRepo,
  getUptimeDataRepo,
};
