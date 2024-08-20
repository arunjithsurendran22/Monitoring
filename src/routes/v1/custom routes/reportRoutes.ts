import { Router } from 'express';
import reportController from '../../../controllers/reportController';
import { verifyUser } from '../../../middlewares/auth/verify-user';

const reportRoutes = (router: Router) => {
  router.route('/getReportData').get(verifyUser,reportController.getReport);

  return router;
};

export default reportRoutes;
