const { Router } = require("express");
const {
  getOrders,
  getUserOrders,
  getOrder,
  updateOrder,
  createOrder,
} = require("../controllers/orderController");

const router = Router();

router.post("/create", createOrder); //body
router.get("/", getOrders);
router.get("/user/:uuid", getUserOrders); //user ID
router.get("/detail/:uuid", getOrder); //Order ID
router.put("/update/:uuid", updateOrder); //Order ID

module.exports = router;
