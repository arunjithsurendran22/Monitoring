import { Router } from 'express';
import reportController from '../../../controllers/reportController';

const reportRoutes = (router: Router) => {
  router.route('/getReportData').get(reportController.getReport);

  return router;
};

export default reportRoutes;
