import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { MoonbeamTransactionEntity, WalletEntity } from '../entities';
import { BadRequest } from '../utils/httpError';
import { ethereum } from '../utils/web3';

const router = express.Router();

// 네트워크 기본 상태 정보
router.get('/network', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const chainId = await ethereum.getChainId();
    const node = await ethereum.getNodeInfo();
  
    const blockNumber = await ethereum.getBlockNumber();

    const protocalVersion = await ethereum.getProtocolVersion();
  

    res.send({ chainId, node, blockNumber, protocalVersion });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 최신 트랜잭션 20개 보여주기
router.get('/transactions/latest', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 정보 겟
router.get('/transactions/:transactionId', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 영수증 정보 겟
router.get('/transactions/:transactionId/recept', async function(req: Request, res: Response, next: NextFunction) {
  const {transactionId} = req.params;
  if(!transactionId){
    return next(new BadRequest('트랜잭션 아이디가 없습니다.'));
  }

  try {
    const recept = await ethereum.getTransactionReceipt(transactionId);

    return res.send({ recept });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 최신 트랜잭션 20개 보여주기
router.get('/blocks/latest', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 정보 겟
router.get('/blocks/:blockId', async function(req: Request, res: Response, next: NextFunction) {
  try {

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});



export default router;
