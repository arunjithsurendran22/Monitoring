import { Request, Response, NextFunction } from "express";
import analyticsService from "../services/analyticsService";
import ERROR from "../middlewares/web_server/http-error";
import ApiResponse from "../utils/api-response";
import {AnalyticsData} from "../@Types/common"

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

    const apiRespose: ApiResponse<{ analyticsData: AnalyticsData }> =
      new ApiResponse<{
        analyticsData: AnalyticsData;
      }>();
    apiRespose.message = "Success!";
    apiRespose.data = { analyticsData };
    apiRespose.statusCode = 201;
    res.json(apiRespose);
  } catch (error) {
    next(error);
  }
};

export default {
  getAnalyticsData,
};
