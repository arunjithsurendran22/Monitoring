import { Request, Response, NextFunction } from "express";
import analyticsService from "../services/analyticsService";
import ERROR from "../middlewares/web_server/http-error";

const getAnalyticsData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { deviceId, startDate, endDate } = req.query;
    const { userId } = req.body;

    if (!userId) {
      throw new ERROR.AuthorizationError("UnAuthorized");
    }

    if (
      typeof deviceId !== "string" ||
      typeof startDate !== "string" ||
      typeof endDate !== "string"
    ) {
      throw new ERROR.ValidationError("Invalid query parameters");
    }

    const analyticsData = await analyticsService.getAnalyticsDataService(
      deviceId,
      startDate,
      endDate
    );

    res.status(200).json({
      status: true,
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
