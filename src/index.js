const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];

// CREATE
app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        isCompleted: false
    };
    tasks.push(task);
    res.json({ status: "success", data: task });
});

// READ
app.get("/tasks", (req, res) => {
    res.json({ status: "success", data: tasks });
});

// UPDATE
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({ status: "error" });

    task.isCompleted = req.body.isCompleted ?? task.isCompleted;
    res.json({ status: "success", data: task });
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ status: "succcess" });
});

app.listen(3000, () => console.log("Server Running on Port 3000"));