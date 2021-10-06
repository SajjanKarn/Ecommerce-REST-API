const router = require("express").Router();

const {
  get_categories,
  create_category,
  delete_category
} = require("../controllers/categories.controller");

router.route("/").get(get_categories).post(create_category);

router.route("/:id").delete(delete_category);

module.exports = router;
