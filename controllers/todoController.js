const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    if (!todos.length) {
      return res.status(404).json({
        status: "fail",
        message: "No todos found",
      });
    }

    res.status(200).json({
      status: "success",
      results: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Internal server error!",
    });
  }
};
exports.getTodoById = async (req, res) => {
  try {
    const todo = awaitTodo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo Not Found!" });
    }
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Internal server error!",
    });
  }
};
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({
        success: false,
        error: messages,
      });
    }
    res.status(500).json({
      status: "fail",
      error: "Internal server error!",
    });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const todo = Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo Not Found!" });
    }
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Internal server error!",
    });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id, req.body);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Todo Not Found!" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Internal server error!",
    });
  }
};
