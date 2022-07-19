const router = require("express").Router();

const { createProduct, deleteProducts, updateProduct, getProduct, getProducts, } = require("../controllers/Products");

const { verificationTokenAuthorization, verificationTokenAndAdmin, } = require("../controllers/Auth");

router.route("/").post(verificationTokenAndAdmin, createProduct).get(getProducts);

router.route("/find/:id").get(verificationTokenAuthorization, getProduct);

router.route("/:id").put(verificationTokenAndAdmin, updateProduct).delete(verificationTokenAndAdmin, deleteProducts);

module.exports = router;
