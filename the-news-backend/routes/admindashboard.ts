import { Request, Response } from 'express';
import main from '../functions/adminPage';

const adminDashboardExpress = require('express');
const adminDashboardRouter = adminDashboardExpress.Router();

adminDashboardRouter.get('/', async (req: Request, res: Response) => {
  const { email }: any = req.query;

  const adminDashboardPageData = await main(email);
  return res.status(200).json(adminDashboardPageData);
});

module.exports = adminDashboardRouter;
