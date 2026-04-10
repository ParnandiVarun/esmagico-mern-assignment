const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    priority: {
  type: String,
  enum: ["low", "medium", "high"],
},

    estimatedHours: Number,

    status: {
      type: String,
      enum: ["Pending", "Running", "Completed", "Failed", "Blocked"],
      default: "Pending",
    },

    dependencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    resourceTag: String,

    maxRetries: {
      type: Number,
      default: 3,
    },

    retryCount: {
      type: Number,
      default: 0,
    },

    versionNumber: {
      type: Number,
      default: 1,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
