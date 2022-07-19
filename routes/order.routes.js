const router = require("express").Router();

const { createOrder, updateOrders, deleteOrder, getUserOrder, getOrders, getUserIncome } = require("../controllers/Orders");

const { verifyToken, verificationTokenAuthorization, verificationTokenAndAdmin } = require("../controllers/Auth");

router.route("/").post(verifyToken, createOrder).get(verificationTokenAndAdmin, getOrders);

router.route("/find/:userId").get(verificationTokenAuthorization, getUserOrder);

router.route("/income").get(verificationTokenAndAdmin, getUserIncome);

router.route("/:id").put(verificationTokenAndAdmin, updateOrders).delete(verificationTokenAndAdmin, deleteOrder);

module.exports = router;
