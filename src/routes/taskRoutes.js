const express = require("express");
const router = express.Router();

let tasks = [];

// CREATE
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "error",
      message: "Title is required"
    });
  }

  const task = {
    id: Date.now(),
    title,
    isCompleted: false
  };

  tasks.push(task);

  res.status(201).json({
    status: "success",
    data: task
  });
});

// READ ALL
router.get("/", (req, res) => {
  res.json({
    status: "success",
    data: tasks
  });
});

// READ BY ID
router.get("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found"
    });
  }

  res.json({
    status: "success",
    data: task
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found"
    });
  }

  task.title = req.body.title ?? task.title;
  task.isCompleted = req.body.isCompleted ?? task.isCompleted;

  res.json({
    status: "success",
    data: task
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);

  res.json({
    status: "success",
    message: "Task deleted"
  });
});

module.exports = router;