import ANALYTICS from "../models/Analytics/analytics";
import { IAnalyticsResult } from "../models/Analytics/analytics-model";

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
        _id: { hour: { $hour: "$timestamp" } },
        count: { $sum: 1 },
        data0: { $sum: { $cond: [{ $eq: ["$metadata.data", 0] }, 1, 0] } },
        data1: { $sum: { $cond: [{ $eq: ["$metadata.data", 1] }, 1, 0] } },
      },
    },
    { $sort: { "_id.hour": 1 } },
  ]);
};

export default {
  getAnalyticsDataRepo,
};
