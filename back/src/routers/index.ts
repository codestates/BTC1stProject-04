import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('Hello');
});

router.get('/network', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const addresses = await ethereum.getAccounts();

    const chainId = await ethereum.getChainId();
    const node = await ethereum.getNodeInfo();
  
    const blockNumber = await ethereum.getBlockNumber();
  
    const currentBlock = await ethereum.getBlock(blockNumber);

    res.send({ chainId, addresses, node, currentBlock });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

export default router;
