import {createConnection} from 'typeorm';
  import{typeormConfig} from '../src/typeorm/config';

import scrapingFunction from './blcokScraping';

main();
async function main() {
    // setup db connection pool
    await createConnection(typeormConfig);
    // setup Database
    await scrapingFunction();
    console.log('done');
}