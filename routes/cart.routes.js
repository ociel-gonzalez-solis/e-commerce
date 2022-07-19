const router = require("express").Router();

const { createCart, updateCart, deleteCart, getCart, getCarts, } = require("../controllers/Cart");

const { verifyToken, verificationTokenAuthorization, verificationTokenAndAdmin, } = require("../controllers/Auth");

router.route("/").post(verifyToken, createCart).get(verificationTokenAndAdmin, getCarts);

router.route("/find/:userId").get(verificationTokenAuthorization, getCart);

router.route("/:id").put(verificationTokenAuthorization, updateCart).delete(verificationTokenAuthorization, deleteCart);

module.exports = router;
