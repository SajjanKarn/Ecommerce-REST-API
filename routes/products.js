const router = require("express").Router();

const {
  get_products,
  get_product,
  create_product,
  update_product,
  delete_product,
  total_product,
} = require("../controllers/products.controller");

router.route("/").get(get_products).post(create_product);

router.route("/count").get(total_product);

router
  .route("/:id")
  .get(get_product)
  .put(update_product)
  .delete(delete_product);

module.exports = router;
