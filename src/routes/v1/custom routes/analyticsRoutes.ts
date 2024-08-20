import { Router } from "express";
import analyticsController from "../../../controllers/analyticsController";
import { verifyUser } from "../../../middlewares/auth/verify-user";

const analyticsRoutes = (router: Router) => {
  router.route("/getAnalyticsData").get(verifyUser,analyticsController.getAnalyticsData);

  return router;
};

export default analyticsRoutes;
