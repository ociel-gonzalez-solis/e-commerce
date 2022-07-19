const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

const postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.status(401).json({ message: "Wrong username" });
    }
    const decryptedPassword = user.comparePassword(req.body.password);

    if (!decryptedPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = user.createJWT();
    // const { password, ...others } = user._doc;

    // res.status(200).json(others);
    res.status(200).json({ user: { name: user.userName }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json({ message: "Invalid Token!" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};

const verificationTokenAuthorization = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You're not allowed to access!" });
    }
  });
};

const verificationTokenAndAdmin = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You're not allowed to access!" });
    }
  });
};

module.exports = {
  postRegister, postLogin, verifyToken, verificationTokenAuthorization, verificationTokenAndAdmin,
};
