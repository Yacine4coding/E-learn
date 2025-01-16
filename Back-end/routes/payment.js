import express from 'express';
import {verifyToken} from "../middleware/jwt.js"
import { createPaypal, createStripe, executePaypal } from '../controller/payment.js';

const payment = express.Router();

payment.post('/create-stripe-payment',verifyToken,createStripe);

payment.post('/create-paypal-payment',verifyToken , createPaypal);

payment.get('/execute-paypal-payment', verifyToken , executePaypal)

export default payment;
