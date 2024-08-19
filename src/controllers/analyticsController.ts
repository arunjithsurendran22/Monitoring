import { Request, Response, NextFunction } from "express";
import analyticsService from "../services/analyticsService"; // Ensure correct path

/**
 * Get analytics data for a given device and date range.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const getAnalyticsData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { deviceId, startDate, endDate } = req.query;

    if (typeof deviceId !== "string" || typeof startDate !== "string" || typeof endDate !== "string") {
      throw new Error("Invalid query parameters");
    }

    const analyticsData = await analyticsService.getAnalyticsDataService(deviceId, startDate, endDate);

    res.json({
      status: true,
      statusCode: 200,
      message: "Analytics data fetched successfully!",
      data: analyticsData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAnalyticsData,
};
