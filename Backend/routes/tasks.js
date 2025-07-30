import express from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// Protect all task routes
router.use(authMiddleware);

// GET /api/tasks - Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(400).json({ error: "Failed to fetch tasks" });
  }
});

// GET /api/tasks/user/:userId - Get all tasks by a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching user's tasks:", error);
    res.status(400).json({ error: "Failed to fetch user's tasks" });
  }
});

// GET /api/tasks/:id - Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(400).json({ error: "Failed to fetch task" });
  }
});

// POST /api/tasks - Create a new task
router.post("/", async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: "Failed to create task" });
  }
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ error: "Failed to delete task" });
  }
});

export default router;
