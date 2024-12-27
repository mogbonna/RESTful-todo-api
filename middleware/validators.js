const { body } = require("express-validator");

const todoValidators = {
  create: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 100 })
      .withMessage("Title must be less than 100 characters!"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('"Title must be less than 100 characters!"'),
  ],
  update: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 100 })
      .withMessage("Title must be less than 100 characters!"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('"Title must be less than 100 characters!"'),
    body("completed")
      .trim()
      .isBoolean()
      .withMessage("Completed must be true or false"),
  ],
};
module.exports = todoValidators;
