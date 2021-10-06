const Category = require("../models/category");

// @METHOD: GET
// @ROUTE: /api/v1/categories -> FETCHES ALL THE CATEGORIES.
exports.get_categories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length)
      return res
        .status(404)
        .json({ success: false, message: "No categories found!" });

    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};

// @METHOD: POST
// @ROUTE: /api/v1/categories -> CREATES A CATEGORY COLLECTION.
exports.create_category = async (req, res) => {
  const { name, icon, color } = req.body;

  try {
    const newCategory = await Category({ name, icon, color });
    const result = await newCategory.save();

    return res.status(201).json({ success: true, ...result._doc });
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
