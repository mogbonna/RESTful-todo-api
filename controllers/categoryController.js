const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
