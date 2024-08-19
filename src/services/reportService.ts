import reportRepository from "../repositories/report-repository";


/**
 * Get a comprehensive report including analytics and uptime.
 * @param deviceId - The ID of the device.
 * @param startDate - The start date for the query.
 * @param endDate - The end date for the query.
 * @returns A promise that resolves to the report data.
 */
const getReportService = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<{ totalAnalytics: number; avgAnalytics: number; totalUptime: number; downtime: number }> => {
  try {
    return await reportRepository.getReportRepo(deviceId, startDate, endDate);
  } catch (error: any) {
    throw new Error(`Failed to generate report: ${error.message}`);
  }
};

export default {
  getReportService,
};
