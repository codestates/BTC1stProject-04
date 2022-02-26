import express, { NextFunction, Request, Response } from 'express';
import {AccountEntity, MoonbeamTransactionEntity} from '../entities';
import {ethereum} from '../utils/web3';
import {BadRequest} from '../utils/httpError';

const router = express.Router();

// 특정 계정 정보 겟
router.get('/:accountAddress', async function(req: Request, res: Response, next: NextFunction) {
  const {accountAddress} = req.params;
  if (!accountAddress) {
    return next(new BadRequest('계정주소가 없습니다.'))
  }

  try {
    const account = await AccountEntity.findOne({account: accountAddress});
    if (!account) {
      return next(new BadRequest('잘못된 계정주소 입니다.'))
    }
    account.balance = await ethereum.getBalance(accountAddress);

    res.send({ account });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

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

// 계정 관련 트랜잭션 확인
router.get('/:accountAddress/transactions', async function(req: Request, res: Response, next: NextFunction) {
  const {accountAddress} = req.params;
  if (!accountAddress) {
    return next(new BadRequest('계정주소가 없습니다.'))
  }
  try {
    const [receiveTransactions, sendTransactions] = await Promise.all([
        MoonbeamTransactionEntity.find({
        where: {
          from: accountAddress,
        }
      }),
        MoonbeamTransactionEntity.find({
        where: {
          to: accountAddress,
        }
      }),
    ]);
    res.send({ receiveTransactions, sendTransactions });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});


export default router;
