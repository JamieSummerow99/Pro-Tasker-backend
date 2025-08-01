import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("owner collaborators");
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ success: false, error: "Failed to fetch projects" });
  }
});

// GET project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner collaborators"
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ success: false, error: "Failed to fetch project" });
  }
});

// CREATE new project
router.post("/", async (req, res) => {
  try {
    const { title, description, owner } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, error: "Title and description are required" });
    }

    const newProject = new Project({
      title,
      description,
      owner,
    });

    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ success: false, error: "Failed to create project" });
  }
});

// UPDATE project
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updatedProject });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(400).json({ success: false, error: "Failed to update project" });
  }
});

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(400).json({ success: false, error: "Failed to delete project" });
  }
});

export default router;
