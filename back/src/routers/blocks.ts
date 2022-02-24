import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { MoonbeamBlockEntity } from '../entities';
import { BadRequest } from '../utils/httpError';
import {ethereum, web3} from '../utils/web3';

const router = express.Router();

// 특정 블록 정보 데이터 겟
router.get('/:blockNumber', async function(req: Request, res: Response, next: NextFunction) {
  const {blockNumber} = req.params;
  if(!blockNumber){
    return next(new BadRequest('블럭 번호가 없습니다.'));
  }

  try {
    const block = await MoonbeamBlockEntity.findOne({number: +blockNumber});
    if(block){
      return res.send(block);
    }

    const blockInfo = await ethereum.getBlock(blockNumber);
    if(!blockInfo){
      return next(new BadRequest('잘못된 블럭 번호입니다.'));
    }

    const blockInDb = MoonbeamBlockEntity.create({
      number: blockInfo.number,
      hash: blockInfo.hash,
      miner: blockInfo.miner,
      extraData: blockInfo.extraData,
      gasLimit: blockInfo.gasLimit,
      gasUsed: blockInfo.gasUsed,
      baseFeePerGas: blockInfo.baseFeePerGas
    });
    await blockInDb.save();

    res.send(blockInDb);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});


export default router;
