const Orders = require("../models/Orders");

const createOrder = async (req, res, next) => {
  const { body } = req;
  try {
    const newOrder = await Orders.create(body);

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const updateOrders = async (req, res, next) => {
  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const Order = await Orders.findByIdAndDelete(id);
    return res.status(200).json({ message: `The Order has been deleted!` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getUserOrder = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const Order = await Orders.find({ userId: userId });
    Order && res.status(200).json(Order);
    !Order && res.status(200).json({ message: "This Order no longer exist!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const Order = await Orders.find();
    Order && res.status(200).json(Order);
    !Order && res.status(200).json({ message: "This Order no longer exist!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getUserIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Orders.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

module.exports = {
  createOrder, updateOrders, deleteOrder, getUserOrder, getOrders, getUserIncome,
};
