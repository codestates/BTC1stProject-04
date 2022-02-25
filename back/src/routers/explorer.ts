import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { MoonbeamTransactionEntity, WalletEntity } from '../entities';
import { BadRequest } from '../utils/httpError';
import { ethereum } from '../utils/web3';

const router = express.Router();

// 최신 트랜잭션 20개 보여주기
router.get('transaction/latest', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 정보 겟
router.get('transaction/:transactionId', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 최신 트랜잭션 20개 보여주기
router.get('blocks/latest', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 정보 겟
router.get('blocks/:blockId', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});



export default router;
