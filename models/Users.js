const mongoose = require("mongoose");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = CryptoJs.AES.encrypt(
    this.password,
    process.env.SECRET
  ).toString();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = function (pass) {
  const hashedPassword = CryptoJs.AES.decrypt(
    this.password,
    process.env.SECRET
  ).toString(CryptoJs.enc.Utf8);

  if (hashedPassword === pass) {
    return hashedPassword;
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);
