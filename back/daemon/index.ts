import {createConnection} from 'typeorm';
  import{typeormConfig} from '../src/typeorm/config';

import scrapingBlocks from './blcokScraping';
import scrapingTransactions from './transactionScraping';

main();
async function main() {
    // setup db connection pool
    await createConnection(typeormConfig);
    // running scrpt
    await scrapingBlocks();
    await scrapingTransactions();
    console.log('done');
}