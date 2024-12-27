const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getAllTodos).post(protect, createTodo);

router
  .route("/:id")
  .get(protect, getTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

module.exports = router;
