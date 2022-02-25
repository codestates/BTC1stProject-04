import _ from 'lodash';
import {getConnection} from 'typeorm';
import {MoonbeamTestnetTransactionEntity, MoonbeamTestnetBlockEntity} from '../src/entities';
import {sleep} from './utils';
import {ethereum} from './web3';

export default async function main() {
  let startBlockNumber = 1760200;
  // db 데이터부터 다시 시작
  const [latestTransactionInDb] = await MoonbeamTestnetTransactionEntity.find({
    order: {id : 'DESC'},
    take: 1,
  })
  if (latestTransactionInDb && latestTransactionInDb && latestTransactionInDb?.blockNumber) {
    startBlockNumber = latestTransactionInDb.blockNumber;
  }
  
  while (1) {
    const targetBlock = await MoonbeamTestnetBlockEntity.findOne({where: {number: startBlockNumber}});
    if (!targetBlock) {
      console.log(startBlockNumber, 'block empty!')
      break;
    }
    
    const {transactions} = targetBlock;
    
    // 데이터 존재하는 다음부터 스크랩핑 시작
    const targetIndex = transactions.findIndex((txId) => {
      if (latestTransactionInDb && txId === latestTransactionInDb.hash) {
        return true;
      }
    })
    
    let tartgetTransactionIds = transactions;
    if (targetIndex > -1) {
      tartgetTransactionIds = transactions.slice(targetIndex + 1)
    }
    
    console.log(`start transaction scraping from block: ${startBlockNumber}, TransactionIndex: ${(targetIndex === -1) ? 0 : targetIndex}`);
    
    const chunkedTrxIds = _.chunk(tartgetTransactionIds, 10)
    try {
      for await (const transactionIds of chunkedTrxIds) {
        const promises = _.map(transactionIds, trxId => ethereum.getTransaction(trxId));
        const transactions = await Promise.all(promises);
        
        const transactionsForDb = _.map(transactions, transaction => {
          return MoonbeamTestnetTransactionEntity.create({
            blockNumber: transaction.blockNumber,
            hash: transaction.hash,
            from: transaction.from,
            to: transaction.to,
            creates: (transaction as any).creates,
            value: transaction.value,
            gas: transaction.gas,
            gasPrice: transaction.gasPrice,
            nonce: transaction.nonce,
            input: transaction.input,
            createdAt: (transaction as any).createdAt,
          })
        })
        await bulkInsertWithTypeorm(transactionsForDb);
        
        await sleep(300);
      }
      
      startBlockNumber++;
    } catch (err) {
      console.error(`blockNumber: ${startBlockNumber} )`, err);
      throw new Error(err);
    }
  }
  
  return 1;
}

async function bulkInsertWithTypeorm(entities: MoonbeamTestnetTransactionEntity[]) {
  const dbConnection = getConnection();
  await dbConnection
  .createQueryBuilder()
  .insert()
  .into(MoonbeamTestnetTransactionEntity)
  .values(entities)
  .execute();
}