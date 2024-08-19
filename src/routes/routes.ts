import { Express, Router, Response } from "express";
import {
  analyticsRoutes,
  authRouter,
  reportRoutes,
  uptimeRoutes,
} from "./v1/custom routes";

export const routes = (app: Express) => {
  const router = Router();

  // custom route goes here
  router.use("/api/v1/auth", authRouter(router));

  router.use("/api/v1/analytics", analyticsRoutes(router));
  router.use("/api/v1/uptime", uptimeRoutes(router));
  router.use("/api/v1/report", reportRoutes(router));
  // default route
  router.get("/", (res: Response) => {
    res.send("This is the router home page");
  });

  app.use(router);
};

export default routes;
