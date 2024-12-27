const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getCategories).post(protect, createCategory);

module.exports = router;
