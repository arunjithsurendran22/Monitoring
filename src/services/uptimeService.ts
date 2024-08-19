import uptimeRepository from "../repositories/uptimeRepository";
import { IUptime } from "../models/Uptime/uptime-model";

/**
 * Get uptime data for a given device and date range.
 * @param deviceId - The ID of the device.
 * @param startDate - The start date for the query.
 * @param endDate - The end date for the query.
 * @returns A promise that resolves to processed uptime data.
 */
const getUptimeDataService = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<{ totalUptime: number }> => {
  try {
    const uptime = await uptimeRepository.getUptimeDataRepo(deviceId, startDate, endDate);

    // Check that each entry has a duration value before summing
    const totalUptime = uptime.reduce((acc, entry) => acc + (entry.metadata.duration || 0), 0);

    return { totalUptime };
  } catch (error: any) {
    throw new Error(`Failed to fetch uptime data: ${error.message}`);
  }
};

export default {
  getUptimeDataService,
};
