import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('Hello');
});

export default router;
