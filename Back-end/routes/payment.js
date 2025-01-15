import express from 'express';
import {verifyToken} from "../middleware/jwt"
import { createPaypal, createStripe, executePaypal } from '../controller/payment';

const payment = express.payment();

payment.post('/create-stripe-payment',verifyToken,createStripe);

payment.post('/create-paypal-payment',verifyToken , createPaypal);

payment.get('/execute-paypal-payment', verifyToken , executePaypal)

export default payment;
