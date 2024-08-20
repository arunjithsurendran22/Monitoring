import { Request, Response, NextFunction } from "express";
import uptimeService from "../services/uptimeService";
import ERROR from "../middlewares/web_server/http-error";
import ApiResponse from "../utils/api-response";

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

    const uptimeData = await uptimeService.getUptimeDataService(
      deviceId,
      startDate,
      endDate
    );

    const apiRespose: ApiResponse<{ uptimeData: any }> = new ApiResponse<{
      uptimeData: any;
    }>();
    apiRespose.message = "Uptime data fetched successfully!!";
    apiRespose.data = { uptimeData };
    apiRespose.statusCode = 201;
    res.json(apiRespose);
  } catch (error) {
    next(error);
  }
};

export default {
  getUptimeData,
};
