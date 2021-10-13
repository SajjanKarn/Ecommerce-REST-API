const router = require("express").Router();

const {
  get_products,
  create_product,
} = require("../controllers/products.controller");

router.route("/").get(get_products).post(create_product);

module.exports = router;
