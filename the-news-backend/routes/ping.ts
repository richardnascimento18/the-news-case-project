import { Request, Response } from 'express';

const pingExpress = require('express');
const pingRouter = pingExpress.Router();

pingRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'pong!', isUp: true });
});

module.exports = pingRouter;
