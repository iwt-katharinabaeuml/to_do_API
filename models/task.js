const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const todoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: {
      type: Date,
    }, // folgeTag
    priority: {
      type: String,
      enum: ["high", "medium", "low", "none"],
      default: "none",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: "_version" }
);

module.exports = mongoose.models.Task || mongoose.model("Task", todoSchema);
