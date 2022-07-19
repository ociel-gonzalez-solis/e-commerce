const router = require("express").Router();

const { updateUsers, deleteUsers, getUser, getUsers, getUserStats, } = require("../controllers/User");

const { verificationTokenAuthorization, verificationTokenAndAdmin, } = require("../controllers/Auth");

router.route("/").get(verificationTokenAndAdmin, getUsers);
router.route("/stats").get(verificationTokenAndAdmin, getUserStats);

router.route("/find/:id").get(verificationTokenAuthorization, getUser);

router.route("/:id").put(verificationTokenAuthorization, updateUsers).delete(verificationTokenAuthorization, deleteUsers);

module.exports = router;
