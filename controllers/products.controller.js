const mongoose = require("mongoose");

const Category = require("../models/category");
const Product = require("../models/product");

// @METHOD: POST
// @ROUTE: /api/v1/products -> CREATES A NEW PRODUCT.
exports.get_products = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    if (!products)
      return res
        .status(404)
        .json({ success: false, message: "Can't find products." });

    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

// @METHOD: GET
// @ROUTE: /api/v1/products/:id -> FETCHES DEATAIL ABOUT A SPECIFIC PRODUCT.
exports.get_product = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ success: false, message: "please enter a valid id!" });

  try {
    const product = await Product.findById(id).populate("category");

    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "No product found with such id." });

    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

// @METHOD: POST
// @ROUTE: /api/v1/products -> CREATES A NEW PRODUCT.
exports.create_product = async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated,
  } = req.body;

  try {
    const resultCategory = await Category.findById(category);

    if (!resultCategory)
      return res
        .status(400)
        .json({ success: false, message: "No category found with such id." });

    const newProduct = new Product({
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
      dateCreated,
    });

    const result = await newProduct.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

// @METHOD: PUT
// @ROUTE: /api/v1/products/:id -> UPDATES A SPECIFIC PRODUCT.
exports.update_product = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated,
  } = req.body;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ success: false, message: "please enter a valid id!" });

  try {
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "category field cannot be empty" });

    const doesCategoryExist = await Category.findById(category);
    if (!doesCategoryExist)
      return res
        .status(400)
        .json({ success: false, message: "No category found with such ID!" });

    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "the product cannot be updated!" });

    return res.status(200).json({ success: true, ...product._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

// @METHOD: DELETE
// @ROUTE: /api/v1/products/:id -> DELETES A PRODUCT BY ID.
exports.delete_product = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ success: false, message: "please enter a valid id!" });

  try {
    const product = await Product.findByIdAndRemove(id);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "No product found with such id" });

    return res.status(200).json({ success: true, ...product._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

// @METHOD: GET
// @ROUTE: /api/v1/products/count -> RETURNS TOTAL NUMBER OF PRODUCT INT.
exports.total_product = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products)
      return res
        .status(400)
        .json({ success: false, message: "Can't find products." });

    return res.status(200).json({ success: true, count: products.length });
  } catch (err) {}
};
