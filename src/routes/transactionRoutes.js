import express from 'express';
import { createTransaction, getTransactions,getTransactionsBySender } from '../controllers/transactionController.js';
import {verifyToken} from '../middleware/jwtMiddleware.js';
const transactionRouter = express.Router();

transactionRouter.post('/create-transaction', verifyToken,createTransaction);
transactionRouter.get('/view-transaction',verifyToken, getTransactions);
transactionRouter.get('/view-transaction/:senderId', verifyToken, getTransactionsBySender);

export default transactionRouter;
