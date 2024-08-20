import { Router } from "express";
import uptimeController from "../../../controllers/uptimeController";
import { verifyUser } from "../../../middlewares/auth/verify-user";

const reportRoutes = (router: Router) => {
  router.route("/getUptimetData").get(verifyUser,uptimeController.getUptimeData);

  return router;
};

export default reportRoutes;
