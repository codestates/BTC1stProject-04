import { BlockTransactionString } from 'web3-eth';
import {MoonbeamTestnetBlockEntity} from '../src/entities';
import {ethereum} from './web3';

export default async function main() {
  let startBlockNumber = 1750000; // 시간상 해당 블록부터
  // db 데이터부터 다시 시작
  const latestBlockInDb = await MoonbeamTestnetBlockEntity.find({
    order: {id : 'DESC'},
    take: 1,
  })
  if (latestBlockInDb && latestBlockInDb[0]) {
    startBlockNumber = latestBlockInDb[0].number + 1;
  }

  while (1) {
    console.log(`start block scraping from ${startBlockNumber}`);

    let targetBlock: undefined | BlockTransactionString;
    try {
      targetBlock = await ethereum.getBlock(startBlockNumber);
    } catch (err) {
      console.error(`blockNumber: ${startBlockNumber} ) : can not get blockinfo from network`);
      throw new Error(err);
    }

    try {
      if (!targetBlock) {
        console.log(`blockNumber: ${startBlockNumber} ) : noblockData`);
        break;
      }
      await sleep(300);
      const blockForDb = MoonbeamTestnetBlockEntity.create({
        number: targetBlock.number,
        hash: targetBlock.hash,
        miner: targetBlock.miner,
        extraData: targetBlock.extraData,
        gasLimit: targetBlock.gasLimit,
        gasUsed: targetBlock.gasUsed,
        baseFeePerGas: targetBlock.baseFeePerGas,
        transactions: targetBlock.transactions || null,
        createdAt: (targetBlock as any).createdAt,
      })
      await MoonbeamTestnetBlockEntity.save(blockForDb);

      startBlockNumber++;
    } catch (err) {
      console.error(`blockNumber: ${startBlockNumber} )`, err);
      throw new Error(err);
    }
  }

  return 1;
}

async function sleep(ms: number) {
  return new Promise(function(reslove, reject) {
      setTimeout(reslove, ms);
  });
}