import express from 'express';
import dotenv from 'dotenv';
import {createConnection} from 'typeorm';
import {typeormConfig} from './typeorm/config';
import {HttpError} from './utils/httpError';
import AllRouters from './routers';
import AccountRouters from './routers/accounts';
import TransactionRouters from './routers/transactions';
import BlockRouters from './routers/blocks';
import {ethereum} from './utils/web3';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended : false }));
app.use((error: HttpError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const code = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(code);
  res.send({
    code,
    message,
    info: error.info,
  });
});

app.use('/', AllRouters);
app.use('/accounts', AccountRouters);
app.use('/transactions', TransactionRouters);
app.use('/blocks', BlockRouters);


// server run
// createConnection(typeormConfig).then(async () => {
//   console.log('database connected');
//   try {
//     const nodeConnection = await ethereum.net.isListening();
//     if (!nodeConnection) {
//       throw new Error(`nodeConnection: ${nodeConnection}`);
//     }
//   } catch(err) {
//     console.error(err);
//     throw new Error('node is not connected!');
//   }
  
//   app.listen(port, () => {
//     console.log(`server start on ${port}`);
//   });
// }).catch(e => {
//   console.error(e);
//   throw new Error(e);
// });

app.listen(port, () => {
    console.log(`server start on ${port}`);
  });

