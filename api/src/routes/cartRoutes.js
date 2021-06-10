const { Router } = require("express");
const { createOrUpdateCart } = require("../controllers/cartController");
const router = Router();

router.put("/", createOrUpdateCart);

module.exports = router;
