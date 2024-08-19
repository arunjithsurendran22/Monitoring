import { Router } from "express";
import uptimeController from "../../../controllers/uptimeController";

const reportRoutes = (router: Router) => {
  router.route("/getReportData").get(uptimeController.getUptimeData);

  return router;
};

export default reportRoutes;
