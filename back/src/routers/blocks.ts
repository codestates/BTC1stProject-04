import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

// 특정 블록 정보 데이터 겟
router.get('/:blockNumber', async function(req: Request, res: Response, next: NextFunction) {
  const {blockNumber} = req.params;
  try {
    console.log(blockNumber)
    res.send({ block: 'TODO' });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});


export default router;
