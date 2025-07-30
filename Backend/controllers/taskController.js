

import Task from '../models/Task.js';
import Project from '../models/Project.js';

//  Check if user owns the project
const verifyOwnership = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');

  // Optionally check for collaborators here
  if (project.owner.toString() !== userId.toString()) {
    throw new Error('Not authorized to access this project');
  }
  return project;
};

// @desc    Get all tasks in a project
// @route   GET /api/projects/:projectId/tasks
export const getTasks = async (req, res, next) => {
  try {
    const project = await verifyOwnership(req.params.projectId, req.user._id);
    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a task in a project
// @route   POST /api/projects/:projectId/tasks
export const createTask = async (req, res, next) => {
  try {
    const project = await verifyOwnership(req.params.projectId, req.user._id);
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || 'To Do',
      project: project._id,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a task
// @route   PUT /api/projects/:projectId/tasks/:taskId
export const updateTask = async (req, res, next) => {
  try {
    const project = await verifyOwnership(req.params.projectId, req.user._id);
    const task = await Task.findOne({
      _id: req.params.taskId,
      project: project._id,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a task
// @route   DELETE /api/projects/:projectId/tasks/:taskId
export const deleteTask = async (req, res, next) => {
  try {
    const project = await verifyOwnership(req.params.projectId, req.user._id);
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      project: project._id,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};





































//Task Management:
//Within a project I own, I can create new tasks with a title, description, and status (e.g., ‘To Do’, ‘In Progress’, ‘Done’).
//I can view all tasks belonging to a specific project.
//I can update the details or status of any task within a project I own.
//I can delete tasks from a project I own.