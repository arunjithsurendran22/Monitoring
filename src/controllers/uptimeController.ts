import { Request, Response, NextFunction } from "express";
import uptimeService from "../services/uptimeService";

/**
 * Get uptime data for a given device and date range.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const getUptimeData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { deviceId, startDate, endDate } = req.query;

    if (typeof deviceId !== "string" || typeof startDate !== "string" || typeof endDate !== "string") {
      throw new Error("Invalid query parameters");
    }

    const uptimeData = await uptimeService.getUptimeDataService(deviceId, startDate, endDate);

    res.json({
      status: true,
      statusCode: 200,
      message: "Uptime data fetched successfully!",
      data: uptimeData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUptimeData,
};
