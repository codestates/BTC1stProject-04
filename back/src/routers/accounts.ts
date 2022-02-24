import express, { NextFunction, Request, Response } from 'express';
import {ethereum} from '../utils/web3';
import {BadRequest} from '../utils/httpError';

const router = express.Router();

// 계정 잔액 확인
router.get('/:accountAddress/balance', async function(req: Request, res: Response, next: NextFunction) {
  const {accountAddress} = req.params;
  if (!accountAddress) {
    return next(new BadRequest('계정주소가 없습니다.'))
  }
  try {
    const balance = await ethereum.getBalance(accountAddress);
    res.send({ balance });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});


export default router;
