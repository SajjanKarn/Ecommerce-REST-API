const router = require("express").Router();

router
  .get("/", (req, res) => {
    return res.status(200).json({ msg: "hello", success: true });
  })
  .get("/count", (req, res) => {
    return res.status(200).json({ count: 10, success: true });
  });

module.exports = router;
