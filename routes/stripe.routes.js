const router = require("express").Router();

const { stripePayments } = require("../controllers/Stripe");

router.route("/payment").post(stripePayments);

module.exports = router;
