import { Request, Response, NextFunction } from "express";
import dataService from "../services/dataService";

/**
 * Generate and save analytics and uptime data.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const generateData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await dataService.generateDataService();

    res.json({
      status: true,
      statusCode: 200,
      message: "Data generated and saved successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  generateData,
};
