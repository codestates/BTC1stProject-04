import {MoonbeamTestnetTransactionEntity, MoonbeamTestnetBlockEntity} from '../src/entities';
import {sleep} from './utils';
import {ethereum} from './web3';

export default async function main() {
  let startBlockNumber = 1760000;
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
      throw new Error(`${targetBlock} : block 정보가 없습니다!`);
    }

    const {transactions} = targetBlock;

    // 데이터 존재하는 다음부터 스크랩핑 시작
    const targetIndex = transactions.findIndex((txId) => {
      if (txId === latestTransactionInDb.hash) {
        return true;
      }
    })

    let tartgetTransactionIds = transactions;
    if (targetIndex > -1) {
      tartgetTransactionIds = transactions.slice(targetIndex + 1)
    }

    console.log(`start transaction scraping from block: ${startBlockNumber}, TransactionIndex: ${(targetIndex === -1) ? 0 : targetIndex}`);
    try {
      for await (const transactionId of tartgetTransactionIds) {
        const transaction = await ethereum.getTransaction(transactionId);
        const transactionForDb = MoonbeamTestnetTransactionEntity.create({
          blockNumber: transaction.blockNumber,
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
          gasPrice: transaction.gasPrice,
          createdAt: (transaction as any).createdAt,
        })
        await MoonbeamTestnetTransactionEntity.save(transactionForDb);

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
