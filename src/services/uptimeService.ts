import uptimeRepository from "../repositories/uptimeRepository";
import { IUptime } from "../models/Uptime/uptime-model";

interface ProcessedUptime {
  timestamp: Date;
  state: 'connected' | 'disconnected';
  duration: number;
}

/**
 * Get uptime data for a given device and date range.
 * @param deviceId - The ID of the device.
 * @param startDate - The start date for the query.
 * @param endDate - The end date for the query.
 * @returns A promise that resolves to an array of processed uptime data.
 */
const getUptimeDataService = async (
  deviceId: string,
  startDate: string,
  endDate: string
): Promise<ProcessedUptime[]> => {
  try {
    const uptimeData = await uptimeRepository.getUptimeDataRepo(deviceId, startDate, endDate);

    if (!uptimeData || uptimeData.length === 0) {
      return [];
    }

    const processedData: ProcessedUptime[] = [];

    for (let i = 0; i < uptimeData.length; i++) {
      const entry = uptimeData[i];
      const state = entry.metadata.data as 'connected' | 'disconnected';
      const currentTimestamp = entry.timestamp; // keep as Date object

      // Calculate duration
      let duration = 0;
      if (i < uptimeData.length - 1) {
        const nextTimestamp = uptimeData[i + 1].timestamp;
        duration = nextTimestamp.getTime() - currentTimestamp.getTime();
      } else {
        // Duration for the last entry
        duration = Date.now() - currentTimestamp.getTime();
      }

      processedData.push({
        timestamp: currentTimestamp,
        state,
        duration,
      });
    }

    return processedData;
  } catch (error: any) {
    throw new Error(`Failed to fetch uptime data: ${error.message}`);
  }
};

export default {
  getUptimeDataService,
};
