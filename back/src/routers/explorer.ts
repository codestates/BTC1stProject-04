import express, { NextFunction, Request, Response } from 'express';
import { ethereum } from '../../daemon/web3';
import { MoonbeamTestnetBlockEntity, MoonbeamTestnetTransactionEntity } from '../entities';
import { BadRequest } from '../utils/httpError';

const router = express.Router();

// 네트워크 기본 상태 정보
router.get('/network', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const type = 'TestNet';
    const chainId = await ethereum.getChainId();
    const node = await ethereum.getNodeInfo();

    const blockNumber = await ethereum.getBlockNumber();

    const protocalVersion = await ethereum.getProtocolVersion();

    const dbTransactionCount = await MoonbeamTestnetTransactionEntity.count();
    const dbBlockCount = await MoonbeamTestnetBlockEntity.count();

    res.send({ type, chainId, node, blockNumber, protocalVersion, dbTransactionCount, dbBlockCount });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 최신 트랜잭션 20개 보여주기
router.get('/transactions/latest', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const latestTransactionsInDb = await MoonbeamTestnetTransactionEntity.find({
      order: {id: 'DESC'},
      take: 20
    });
    if(!latestTransactionsInDb){
      return next(new BadRequest('트랜잭션 정보가 없습니다.'));
    }

    res.send({latestTransactions: latestTransactionsInDb});
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 정보 겟
router.get('/transactions/:transactionId', async function(req: Request, res: Response, next: NextFunction) {
  const {transactionId} = req.params;
  if(!transactionId){
    return next(new BadRequest('트랜잭션 아이디가 없습니다.'));
  }
  try {
    const transaction = await MoonbeamTestnetTransactionEntity.findOne({hash: transactionId});
    if(transaction){
      return res.send({ transaction });
    }

    const transactionInfo = await ethereum.getTransaction(transactionId);
    if(!transactionInfo){
      return next(new BadRequest('잘못된 트랜잭션 아이디 입니다.'));
    }

    const transactionInDb = MoonbeamTestnetTransactionEntity.create({
      blockNumber: transactionInfo.blockNumber,
      hash: transactionId,
      from: transactionInfo.from,
      to: transactionInfo.to,
      creates: (transactionInfo as any).creates,
      value: transactionInfo.value,
      gas: transactionInfo.gas,
      gasPrice: transactionInfo.gasPrice,
      nonce: transactionInfo.nonce,
      input: transactionInfo.input
    });
    await transactionInDb.save();

    res.send({ transaction: transactionInDb });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 영수증 정보 겟
router.get('/transactions/:transactionId/receipt', async function(req: Request, res: Response, next: NextFunction) {
  const {transactionId} = req.params;
  if(!transactionId){
    return next(new BadRequest('트랜잭션 아이디가 없습니다.'));
  }
  try {
      const receipt = await ethereum.getTransactionReceipt(transactionId);
  
      return res.send({ receipt });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 최신 블럭 20개 보여주기
router.get('/blocks/latest', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const latestBlocksInDb = await MoonbeamTestnetBlockEntity.find({
      order: {id: 'DESC'},
      take: 20
    });
    if(!latestBlocksInDb){
      return next(new BadRequest('블럭 정보가 없습니다.'));
    }

    res.send({latestBlocks: latestBlocksInDb});
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 블럭 정보 겟
router.get('/blocks/:blockId', async function(req: Request, res: Response, next: NextFunction) {
  const {blockId} = req.params;
  if(!blockId){
    return next(new BadRequest('블럭 번호가 없습니다.'));
  }

  try {
    const block = await MoonbeamTestnetBlockEntity.findOne({number: +blockId});
    if(block){
      return res.send(block);
    }

    ethereum.getBlock(blockId)
    .then(blockInfo => {
      const blockInDb = MoonbeamTestnetBlockEntity.create({
        number: blockInfo.number,
        hash: blockInfo.hash,
        miner: blockInfo.miner,
        extraData: blockInfo.extraData,
        gasLimit: blockInfo.gasLimit,
        gasUsed: blockInfo.gasUsed,
        baseFeePerGas: blockInfo.baseFeePerGas,
        transactions: blockInfo.transactions
      });
      blockInDb.save();
      res.send({block: blockInDb});
    })
    .catch(err => {
      return next(new BadRequest('잘못된 블럭 번호입니다.'));
    });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});



export default router;
