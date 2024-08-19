import analyticsRepository from "../repositories/analyticsRepository";
import uptimeRepository from "../repositories/uptimeRepository";
import { IAnalyticsResult } from "../models/Analytics/analytics-model";
import { IUptime } from "../models/Uptime/uptime-model";

/**
 * Get report data including analytics and uptime.
 * @param deviceId - The ID of the device.
 * @param startDate - The start date for the query.
 * @param endDate - The end date for the query.
 * @returns A promise that resolves to report data.
 */
const getReportRepo = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<{
  totalAnalytics: number;
  avgAnalytics: number;
  totalUptime: number;
  downtime: number;
}> => {
  const analytics: IAnalyticsResult[] = await analyticsRepository.getAnalyticsDataRepo(deviceId, startDate, endDate);
  const uptime: IUptime[] = await uptimeRepository.getUptimeDataRepo(deviceId, startDate, endDate);

  const totalAnalytics = analytics.reduce((acc, day) => acc + day.count, 0);
  const avgAnalytics = totalAnalytics / (analytics.length || 1);
  const totalUptime = uptime.reduce((acc, entry) => acc + (entry.metadata.duration || 0), 0);
  const downtime = totalUptime - totalUptime; // Adjust this calculation if needed

  return {
    totalAnalytics,
    avgAnalytics,
    totalUptime,
    downtime
  };
};

export default {
  getReportRepo,
};
