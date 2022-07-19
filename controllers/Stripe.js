const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripePayments = (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeResponse) => {
      const result = stripeErr
        ? res.status(500).json({ message: "Something went wrong" }, stripeErr)
        : res.status(200).json(stripeResponse);
      return result;
    }
  );
};

module.exports = {
  stripePayments,
};
