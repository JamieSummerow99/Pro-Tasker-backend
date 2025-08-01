
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }





  // Make sure user is owner or collaborator

  
  const isAuthorized = project.owner.equals(req.user._id) || 
    project.collaborators.includes(req.user._id);

  if (!isAuthorized) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const task = await Task.create({
    title,
    description,
    status,
    project: projectId,
    assignedTo,
  });

  res.status(201).json(task);
};