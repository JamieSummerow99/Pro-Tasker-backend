import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { projectId } = req.params;

    // Make sure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Verify the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the user is the project owner
    const isOwner = project.owner?.equals(req.user._id);
    if (!isOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Create and save the new task
    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      project: projectId,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

