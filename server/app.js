const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/error.middleware");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const executionRoutes = require("./routes/execution.routes");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", executionRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;
