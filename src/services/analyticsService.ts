import analyticsRepository from "../repositories/analyticsRepository";
import { IAnalyticsResult } from "../models/Analytics/analytics-model";

const getAnalyticsDataService = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<{
  dataByHour: number[];
  net: number;
  avg: number;
  busiestHour: number;
}> => {
  try {
    const analytics = await analyticsRepository.getAnalyticsDataRepo(deviceId, startDate, endDate);

    const dataByHour = Array(24).fill(0);
    let total = 0;

    analytics.forEach(hourData => {
      dataByHour[hourData._id.hour] = hourData.count;
      total += hourData.count;
    });

    const avg = total / 24;
    const busiestHour = dataByHour.indexOf(Math.max(...dataByHour));

    return { dataByHour, net: total, avg, busiestHour };
  } catch (error: any) {
    throw new Error(`Failed to fetch analytics data: ${error.message}`);
  }
};

export default {
  getAnalyticsDataService,
};
