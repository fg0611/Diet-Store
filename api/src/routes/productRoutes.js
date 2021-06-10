const { Router } = require("express");
const {
  getProducts,
  getProductDetail,
  createProduct,
  deleteProduct,
  updateProduct,
  productsByCategory,
  searchProduct,
} = require("../controllers/productController");
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = Router();

router.get("/", getProducts);
router.post("/create", createProduct);
router.put("/update", updateProduct);
router.delete("/delete", deleteProduct);
router.get("/detail/:uuid", getProductDetail);
router.get("/filterByCategory", productsByCategory);
router.get("/search", searchProduct);
router.get("/reviews/:productUuid", getReviewsByProduct);
router.post("/addReview", createReview);
router.put("/updateReview", updateReview);
router.delete("/deleteReview", deleteReview);

module.exports = router;
