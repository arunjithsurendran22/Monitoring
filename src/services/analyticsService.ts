import analyticsRepository from "../repositories/analyticsRepository";
import { IAnalyticsResult } from "../models/Analytics/analytics-model";

/**
 * Get analytics data for a given device and date range.
 * @param deviceId - The ID of the device.
 * @param startDate - The start date for the query.
 * @param endDate - The end date for the query.
 * @returns An object containing analytics data, total count, average count, and the busiest hour.
 */
const getAnalyticsDataService = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<{ dataByHour: IAnalyticsResult[]; total: number; avg: number; busiestHour: number }> => {
  try {
    const analytics = await analyticsRepository.getAnalyticsDataRepo(deviceId, startDate, endDate);

    const total = analytics.reduce((acc, hourData) => acc + hourData.count, 0);
    const avg = total / (analytics.length || 1);
    const busiestHour = analytics.sort((a, b) => b.count - a.count)[0]?._id.hour || 0;

    return { dataByHour: analytics, total, avg, busiestHour };
  } catch (error: any) {
    throw new Error(`Failed to fetch analytics data: ${error.message}`);
  }
};

export default {
  getAnalyticsDataService,
};
