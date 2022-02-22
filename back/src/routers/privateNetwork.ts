import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

router.get('/node-accounts', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const addresses = await ethereum.getAccounts();
    const address1 = addresses[0];
    const address2 = addresses[1];
    const address3 = addresses[2];

    const balance1 = await ethereum.getBalance(address1);
    const balance2 = await ethereum.getBalance(address2);
    const balance3 = await ethereum.getBalance(address3);

    res.send({
      address1,
      address2,
      address3,
      balance1: web3.utils.fromWei(balance1),
      balance2: web3.utils.fromWei(balance2),
      balance3: web3.utils.fromWei(balance3),
    });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});


export default router;
