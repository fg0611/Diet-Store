const { Router } = require("express");
const { updateCategory } = require("../controllers/categoryController");
const {
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

const router = Router();

router.get("/", getLocations); //also can be used to get ONE location
//by query UUID
router.get("/", getLocations);
router.post("/add", addLocation); //body
router.put("/update", updateLocation);
router.delete("/delete", deleteLocation);

module.exports = router;
