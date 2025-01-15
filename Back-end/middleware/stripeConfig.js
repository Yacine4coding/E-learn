import Stripe from 'stripe';


// Initialize Stripe with the secret key
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripeInstance;
