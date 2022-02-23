import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

// 계정 생성 (니모닉 월렛형 데이터 저장 및 지갑주소 리턴)
router.post('/', async function(req: Request, res: Response, next: NextFunction) {
  try {
    res.send({ account: 'TODO' });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 계정 정보 겟
router.get('/:accountId', async function(req: Request, res: Response, next: NextFunction) {
  const {accountId} = req.params;
  try {
    res.send({ account: 'TODO' });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 계정 잔액 확인
router.get('/:accountId/balance', async function(req: Request, res: Response, next: NextFunction) {
  const {accountId} = req.params;
  try {
    res.send({ account: 'TODO' });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});


export default router;
