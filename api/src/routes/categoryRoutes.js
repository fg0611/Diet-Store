const { Router } = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryByName,
} = require("../controllers/categoryController");
const router = Router();

router.get("/", getCategories);
router.post("/create", createCategory);
router.delete("/delete", deleteCategory);
router.put("/update", updateCategory);
router.get("/byName", getCategoryByName);

module.exports = router;
