/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import AuthHandler from '../../controllers/authHandler';
import viewLoanHistory from '../../controllers/repayHandler';
import authenticate from '../../middleware/authenticate';
import LoansHandler from '../../controllers/loansHandler';
import Authorizer from '../../middleware/authorize';

const { authorize } = Authorizer;
const app = express.Router();

// Auth route.
app.get('/auth/signup', AuthHandler.reqSignup);

app.post('/auth/signup', AuthHandler.createUser);

app.get('/auth/signin', AuthHandler.reqSignin);

app.post('/auth/signin', AuthHandler.login);

app.get('/loans', authorize, authenticate, LoansHandler.reqLoan);

app.post('/loans', authorize, authenticate, LoansHandler.applyForLoan);

app.get('/loans/:id/repayments', authorize, authenticate, viewLoanHistory.viewLoanHistory);

app.patch('/loans/:email/verify', authorize, authenticate, AuthHandler.verifyUser);
export default app;
