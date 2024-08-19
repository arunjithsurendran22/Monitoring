import { Router } from "express";
import analyticsController from "../../../controllers/analyticsController";

const analyticsRoutes = (router: Router) => {
  router.route("/getAnalyticsData").get(analyticsController.getAnalyticsData);

  return router;
};

export default analyticsRoutes;
