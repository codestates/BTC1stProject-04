import express, { NextFunction, Request, Response } from 'express';
import {getManager} from 'typeorm';
import {ethers} from 'ethers';
import {AccountEntity, WalletEntity} from '../entities';
import AuthService from '../services/auth.service';
import {BadRequest} from '../utils/httpError';

const router = express.Router();

// 지갑 생성 (니모닉 월렛형 데이터 저장 및 지갑주소 리턴)
router.post('/', async function(req: Request, res: Response, next: NextFunction) {
  const {username, password} = req.body;
  if (!username) {
    return next(new BadRequest('username이 없습니다.'))
  } else if (!password) {
    return next(new BadRequest('password가 없습니다.'))
  }

  try {
    const existedUsername = await WalletEntity.count({where: {username}});
    if (existedUsername) {
      return next(new BadRequest('이미 존재하는 계정입니다.'))
    }

    const walletInfo = ethers.Wallet.createRandom();
    const mnemonic = walletInfo.mnemonic.phrase;

    const {encryptedPassword, salt} = AuthService.createEncryptedPasswordAndSalt(password);

    await getManager().transaction(async entityManager => {
      const wallet = WalletEntity.create({
        username,
        password: encryptedPassword,
        salt,
        praivateKey: walletInfo.privateKey,
        accounts: [{
          account: walletInfo.address,
        }]
      });
      const savedWallet = await entityManager.save(WalletEntity, wallet);

      const account = AccountEntity.create({
        account: walletInfo.address,
        walletId: savedWallet.id,
      });
      await entityManager.save(AccountEntity, account);
    })

    res.send({ mnemonic });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

// 지갑 로그인
router.post('/login', async function(req: Request, res: Response, next: NextFunction) {
  const {username, password} = req.body;
  if (!username) {
    return next(new BadRequest('username이 없습니다.'))
  } else if (!password) {
    return next(new BadRequest('password가 없습니다.'))
  }

  try {
    const wallet = await WalletEntity.findOne({
      where: {username},
      relations: ['accounts']
    });
    if (!wallet) {
      return next(new BadRequest('존재하지 않는 계정입니다.'))
    }
    
    const correctPassword = AuthService.comparePassword(password, wallet.password, wallet.salt);
    if (!correctPassword) {
      return next(new BadRequest('비밀번호가 다릅니다.'))
    }

    res.send({ accounts: wallet.accounts });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});


export default router;