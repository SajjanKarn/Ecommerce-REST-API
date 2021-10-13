const Category = require("../models/category");
const Product = require("../models/product");

// @METHOD: POST
// @ROUTE: /api/v1/products -> CREATES A NEW PRODUCT.
exports.get_products = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products)
      return res
        .status(404)
        .json({ success: false, message: "products cannot be found!" });

    return res.status(200).json({ success: true, data: products });
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
    if (!result)
      return res
        .status(400)
        .json({ success: false, message: "the product cannot be created." });

    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};
