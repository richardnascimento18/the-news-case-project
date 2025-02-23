import { Request, Response } from 'express';
import main from '../functions/userPage';

const userDashboardExpress = require('express');
const userDashboardRouter = userDashboardExpress.Router();

userDashboardRouter.get('/', async (req: Request, res: Response) => {
  const { email }: any = req.query;

  const userDashboardPageData = await main(email);
  return res.status(200).json(userDashboardPageData);
});

module.exports = userDashboardRouter;
