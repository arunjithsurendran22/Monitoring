import { Request, Response, NextFunction } from "express";
import reportService from "../services/reportService";
import ERROR from "../middlewares/web_server/http-error";

/**
 * Get a comprehensive report including analytics and uptime.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const getReport = async (
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
    const reportData = await reportService.getReportService(
      deviceId,
      startDate,
      endDate
    );

    res.json({
      status: true,
      statusCode: 200,
      message: "Report generated successfully!",
      data: reportData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getReport,
};
