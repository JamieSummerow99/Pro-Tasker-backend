import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("owner collaborators");
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET one project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner collaborators"
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// CREATE new project
router.post("/", async (req, res) => {
  try {
    const { name, description, owner, collaborators } = req.body;

    const newProject = new Project({
      name,
      description,
      owner,
      collaborators,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ error: "Failed to create project" });
  }
});

// UPDATE a project
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(400).json({ error: "Failed to update project" });
  }
});

// DELETE a project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(400).json({ error: "Failed to delete project" });
  }
});

export default router;
