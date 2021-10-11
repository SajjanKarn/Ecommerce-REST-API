const router = require("express").Router();

const {
  get_categories,
  total_categories,
  get_category,
  create_category,
  delete_category
} = require("../controllers/categories.controller");

router.route("/").get(get_categories).post(create_category);

router.route("/count").get(total_categories);

router.route("/:id").get(get_category).delete(delete_category);


module.exports = router;
