const Cart = require("../models/Cart");

const createCart = async (req, res, next) => {
  const { body } = req;
  try {
    const newCart = await Cart.create(body);

    return res.status(201).json(newCart);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const deleteCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `The Cart has been deleted!` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.find({ userId: userId });
    cart && res.status(200).json(cart);
    !cart && res.status(200).json({ message: "This cart no longer exist!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getCarts = async (req, res, next) => {
  try {
    const cart = await Cart.find();
    cart && res.status(200).json(cart);
    !cart && res.status(200).json({ message: "This product no longer exist!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
};
