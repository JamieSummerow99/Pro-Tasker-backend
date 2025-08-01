import express, { Router } from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../utils/auth.js";


const router = express.Router();

router.use(authMiddleware);


// GET all tasks (optional: for testing/debugging)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("project assignedTo");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET tasks for a specific project
router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate("assignedTo");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching project tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks for project" });
  }
});
// CREATE a new task for a project
router.post("/project/:projectId", async (req, res) => {
  try {
    const { title, description, assignedTo, status, tags, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      project: req.params.projectId,
      assignedTo,
      status,
      tags,
      dueDate,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(400).json({ error: "Failed to create task" });
  }
});

// UPDATE a task
router.put("/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(400).json({ error: "Failed to update task" });
  }
});

// DELETE a task
router.delete("/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(400).json({ error: "Failed to delete task" });
  }
});

export default Router