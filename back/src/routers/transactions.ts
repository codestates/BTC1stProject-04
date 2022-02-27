import express, { NextFunction, Request, Response } from 'express';
import { AccountEntity, MoonbeamTransactionEntity, WalletEntity } from '../entities';
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
    const senderInfo = await AccountEntity.findOne({
      where: {account: addressFrom},
      relations: ['wallet'],
    });
    if(!senderInfo){
      return next(new BadRequest('잘못된 발신 주소 입니다.'));
    }

    const createTransaction = await ethereum.accounts.signTransaction(
      {
        gas: 21000,
        to: addressTo,
        value: amount,
      },
      senderInfo.wallet.praivateKey
    );

    const createReceipt = await ethereum.sendSignedTransaction(createTransaction.rawTransaction!);
    
    const transactionInfo = await ethereum.getTransaction(createReceipt.transactionHash);
    const transactionInDb = MoonbeamTransactionEntity.create({
      blockNumber: transactionInfo.blockNumber,
      hash: createReceipt.transactionHash,
      from: transactionInfo.from,
      to: transactionInfo.to,
      value: transactionInfo.value,
      gasPrice: transactionInfo.gasPrice
    });
    await transactionInDb.save();

    console.log(
      `API: /transactions\n`
    + `Type: [POST]\n`
    + `Input: addressFrom:${addressFrom}, addressTo:${addressTo}, amount:${amount}\n`
    + `Output: transactionHash:${createReceipt.transactionHash}`
    );

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
      console.log(
        `API: /transactions/:transactionId\n`
      + `Type: [GET]\n`
      + `Input: transactionId:${transactionId}\n`
      + `Output: transaction:${transaction}`
      );
      return res.send({ transaction });
    }

    const transactionInfo = await ethereum.getTransaction(transactionId);
    if(!transactionInfo){
      return next(new BadRequest('잘못된 트랜잭션 아이디 입니다.'));
    }
      
    const transactionInDb = MoonbeamTransactionEntity.create({
      blockNumber: transactionInfo.blockNumber,
      hash: transactionId,
      from: transactionInfo.from,
      to: transactionInfo.to,
      value: transactionInfo.value,
      gasPrice: transactionInfo.gasPrice
    });
    await transactionInDb.save();
    
    console.log(
      `API: /transactions/:transactionId\n`
    + `Type: [GET]\n`
    + `Input: transactionId:${transactionId}\n`
    + `Output: transaction:${transaction}`
    );
    res.send({ transaction: transactionInDb });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

export default router;
