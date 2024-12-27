const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please a title for the todo"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add text index for search functionality
todoSchema.index({ title: "text", description: "text" });

todoSchema.pre(/^find/, function (next) {
  this.select("-__v");

  next();
});

module.exports = mongoose.model("Todo", todoSchema);
