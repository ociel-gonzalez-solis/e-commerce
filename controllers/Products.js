const Product = require("../models/Products");

const createProduct = async (req, res, next) => {
  const { body } = req;
  try {
    const newProduct = await Product.create(body);

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const deleteProducts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `Product ${deletedProduct.title} has been deleted!` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    product && res.status(200).json(product);
    !product &&
      res.status(200).json({ message: "This product no longer exist!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

const getProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products = qNew
      ? await Product.find().sort({ _id: -1 }).limit(5)
      : qCategory
        ? await Product.find({
          categories: {
            $in: [qCategory],
          },
        })
        : await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }, error);
  }
};

module.exports = {
  createProduct, deleteProducts, updateProduct, getProduct, getProducts,
};
