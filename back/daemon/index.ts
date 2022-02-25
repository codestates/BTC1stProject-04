import {createConnection, getConnection} from 'typeorm';
import{typeormConfig} from '../src/typeorm/config';
import {sleep} from './utils';

import scrapingBlocks from './blcokScraping';
import scrapingTransactions from './transactionScraping';

const getSleepTime = setExponenetialBackOff(2000);
main();
async function main() {
    try {
      await getConnection();
    } catch (err) {
      // setup db connection pool
      await createConnection(typeormConfig);
    }

    // running scrpt
    await scrapingBlocks();
    await scrapingTransactions();

    // 에러 아닌 이상 재귀로 지속적인 스크랩핑
    const waitMs = getSleepTime();
    console.log('done & wait for:', waitMs);
    await sleep(waitMs);
    main();

}

function setExponenetialBackOff(ms: number) {
  const init = ms;
  let waiting = ms;
  return function () {
    if (waiting > 40000) {
      waiting = init;
    } else {
      waiting *= 2;
    }
    return waiting;
  }
}