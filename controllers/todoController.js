const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const queryObj = { user: req.user.id };

    // Search functionality
    if (req.query.search) {
      queryObj.$text = { $search: req.query.search };
    }

    // Filter by category
    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    // Filter by priority
    if (req.query.priority) {
      queryObj.priority = req.query.priority;
    }

    // Filter by completion status
    if (req.query.completed) {
      queryObj.completed = req.query.completed === "true";
    }

    // Filter by due date
    if (req.query.dueDate) {
      queryObj.dueDate = { $lte: new Date(req.query.dueDate) };
    }
    const todos = await Todo.find(queryObj)
      .populate("category", "name")
      .sort({ dueDate: 1, priority: -1, createdAt: -1 });

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
exports.getTodo = async (req, res) => {
  try {
    req.body.user = req.user.id;
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
    req.body.user = req.user.id;
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
    req.body.user = req.user.id;
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
    req.body.user = req.user.id;
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
