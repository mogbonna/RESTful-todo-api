const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

// todoSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.__v;
//     return ret;
//   },
// });

todoSchema.pre(/^find/, function (next) {
  this.select("-__v");

  next();
});

module.exports = mongoose.model("Todo", todoSchema);
