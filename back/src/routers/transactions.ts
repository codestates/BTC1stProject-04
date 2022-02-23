import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

// 트랜잭션 생성
router.post('/', async function(req: Request, res: Response, next: NextFunction) {
  try {
    res.send({ transaction: 'TODO' });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 겟
router.get('/:transactionId', async function(req: Request, res: Response, next: NextFunction) {
  const {transactionId} = req.params;
  try {
    res.send({ transaction: 'TODO' });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

export default router;
