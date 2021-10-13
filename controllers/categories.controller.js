const Category = require("../models/category");

// @METHOD: GET
// @ROUTE: /api/v1/categories/:id -> FETCHES A SPECIFIC CATEGORY BASED ON ID.
exports.get_category = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ _id: id });
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "No category exists with such id." });

    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

// @METHOD: GET
// @ROUTE: /api/v1/categories -> FETCHES ALL THE CATEGORIES.
exports.get_categories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories)
      return res
        .status(404)
        .json({ success: false, message: "categories cannot be found!" });

    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};

// @METHOD: GET
// @ROUTE: /api/v1/categories/count -> RETURNS THE TOTAL CATEGORY INT.
exports.total_categories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories)
      return res
        .status(404)
        .json({ success: false, message: "categories cannot be found!" });

    return res
      .status(200)
      .json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};

// @METHOD: POST
// @ROUTE: /api/v1/categories -> CREATES A CATEGORY COLLECTION.
exports.create_category = async (req, res) => {
  const { name, icon, color } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Please enter name of category" });

  try {
    const newCategory = await Category({ name, icon, color });
    const result = await newCategory.save();

    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};

// @METHOD: PUT
// @ROUTE: /api/v1/categories/:id -> UPDATES A CATEGORY BY ID.
exports.update_category = async (req, res) => {
  const { name, icon, color } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, icon, color },
      { new: true }
    );

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "No category found with such id." });

    return res.status(200).json({ success: true, ...category._doc });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};

// @METHOD: DELETE
// @ROUTE: /api/v1/categories/:id -> DELETES A CATEGORY BY ID.
exports.delete_category = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "No id specified!" });

  try {
    const result = await Category.findByIdAndRemove(req.params.id);
    if (!result)
      return res
        .status(400)
        .json({ success: false, message: "Category not found!" });

    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};
