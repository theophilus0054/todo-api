const express = require("express");
const app = express();

app.use(express.json());

// routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

module.exports = app;