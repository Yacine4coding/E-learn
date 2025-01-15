export async function createStripe(req, res) {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
}
export async function createPaypal(req, res) {
  const { amount, currency } = req.body;

  const payment = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/success", // Adjust for frontend
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        amount: {
          total: amount,
          currency,
        },
        description: "Payment description",
      },
    ],
  };

  paypal.payment.create(payment, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error creating PayPal payment");
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      );
      res.send({ approvalUrl: approvalUrl.href });
    }
  });
}
export async function executePaypal(req, res) {
  const { paymentId, PayerID } = req.query;

  paypal.payment.execute(paymentId, { payer_id: PayerID }, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send("internal server error");
    } else {
      res.send("Payment successful");
    }
  });
}
