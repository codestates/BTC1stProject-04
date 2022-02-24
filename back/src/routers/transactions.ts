import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { MoonbeamTransactionEntity, WalletEntity } from '../entities';
import { BadRequest } from '../utils/httpError';
import { ethereum } from '../utils/web3';

const router = express.Router();

// 트랜잭션 생성
router.post('/', async function(req: Request, res: Response, next: NextFunction) {
  const {addressFrom, addressTo, amount} = req.body;
  if (!addressFrom) {
    return next(new BadRequest('발신 주소가 없습니다.'));
  } else if (!addressTo) {
    return next(new BadRequest('수신 주소가 없습니다.'));
  } else if (!amount) {
    return next(new BadRequest('송금액이 없습니다.'));
  }

  try {
    const senderWallet = await WalletEntity.findOne({id: addressFrom});
    if(!senderWallet){
      return next(new BadRequest('잘못된 발신 주소 입니다.'));
    }

    const createTransaction = await ethereum.accounts.signTransaction(
      {
        gas: 21000,
        to: addressTo,
        value: amount,
      },
      senderWallet.praivateKey
    );

    const createReceipt = await ethereum.sendSignedTransaction(createTransaction.rawTransaction!);
    
    await getManager().transaction(async entityManager => {
      const transactionInfo = await ethereum.getTransaction(createReceipt.transactionHash);
      const transaction = MoonbeamTransactionEntity.create({
        blockNumber: transactionInfo.blockNumber,
        hash: createReceipt.transactionHash,
        from: transactionInfo.from,
        to: transactionInfo.to,
        value: transactionInfo.value,
        gasPrice: transactionInfo.gasPrice
      });
      await entityManager.save(MoonbeamTransactionEntity, transaction);
    });

    res.send({ transactionHash: createReceipt.transactionHash });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 특정 트랜잭션 겟
router.get('/:transactionId', async function(req: Request, res: Response, next: NextFunction) {
  const {transactionId} = req.params;
  if(!transactionId){
    return next(new BadRequest('트랜잭션 아이디가 없습니다.'));
  }

  try {
    const transaction = await MoonbeamTransactionEntity.findOne({hash: transactionId});
    if(transaction){
      res.send({ transaction: transaction });
    }

    await getManager().transaction(async entityManager => {
      const transactionInfo = await ethereum.getTransaction(transactionId);
      if(!transactionInfo){
        return next(new BadRequest('잘못된 트랜잭션 아이디 입니다.'));
      }
      
      const transaction = MoonbeamTransactionEntity.create({
        blockNumber: transactionInfo.blockNumber,
        hash: transactionId,
        from: transactionInfo.from,
        to: transactionInfo.to,
        value: transactionInfo.value,
        gasPrice: transactionInfo.gasPrice
      });
      await entityManager.save(MoonbeamTransactionEntity, transaction);
      
      res.send({ transaction: transactionInfo });
    });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

export default router;
