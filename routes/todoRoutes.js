const express = require("express");
const TodoController = require("../controllers/todoController");

const router = express.Router();

router
  .route("/")
  .get(TodoController.getAllTodos)
  .post(TodoController.createTodo);

router
  .route("/:id")
  .get(TodoController.getTodoById)
  .patch(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

module.exports = router;
