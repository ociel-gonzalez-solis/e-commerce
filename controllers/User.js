const User = require("../models/Users");
const CryptoJs = require("crypto-js");

const updateUsers = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const deleteUsers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `User ${deletedUser.userName} has been deleted!` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

module.exports = {
  updateUsers, deleteUsers, getUser, getUsers, getUserStats,
};
