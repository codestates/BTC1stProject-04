import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '../utils/httpError';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

// health check
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('ok');
});

// 네트워크 기본 상태 정보
router.get('/network', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const type = 'LocalNet';
    const chainId = await ethereum.getChainId();
    const node = await ethereum.getNodeInfo();
  
    const blockNumber = await ethereum.getBlockNumber();
    const protocalVersion = await ethereum.getProtocolVersion();

    const currentBlock = await ethereum.getBlock(blockNumber);

    res.send({ type, chainId, node, blockNumber, protocalVersion });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// 테스트넷 faucet 처리 - test 계정에 100eth 전송
router.get('/faucet/:accountAddress', async function(req: Request, res: Response, next: NextFunction) {
  const testAccount = {
    name: 'Baltathar',
    address: '0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0',
    pk: '0x8075991ce870b93a8870eca0c0f91913d12f47948ca0fd25b49c6fa7cdbeee8b',
  }

  const {accountAddress} = req.params;
  if(!accountAddress){
    return next(new BadRequest('수신자 주소가 없습니다.'));
  }

  try {
    const createTransaction = await ethereum.accounts.signTransaction(
      {
        from: testAccount.address,
        gas: 21000,
        to: accountAddress,
        value: web3.utils.toWei('100', 'ether'),
      },
      testAccount.pk
    );

    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction!);
    console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);

    const targetAccountBalance = await ethereum.getBalance(accountAddress)

    res.send({account: accountAddress, balance: targetAccountBalance});
  } catch(err) {
    console.error(err);
    return next(err);
  }
});


export default router;
