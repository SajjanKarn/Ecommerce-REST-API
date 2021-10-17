const router = require("express").Router();

const {
  get_products,
  get_product,
  create_product,
} = require("../controllers/products.controller");

router.route("/").get(get_products).post(create_product);

router.route("/:id").get(get_product);

module.exports = router;
