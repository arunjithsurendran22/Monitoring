import { Router } from "express";
import dataController from "../../../controllers/dataController";

const dataRoutes = (router: Router) => {
  router.route("/generateData").post(dataController.generateData);

  return router;
};

export default dataRoutes;
