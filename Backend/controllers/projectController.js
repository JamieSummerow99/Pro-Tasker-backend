import express from "express";
import { protect } from "../utils/auth.js";


import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";


import {
  getProjectTasks,
  createProjectTask,
  updateProjectTask,
  deleteProjectTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Projects CRUD
router.route("/")
  .get(getProjects)        
  .post(createProject);    

router.route("/:id")
  .get(getProjectById)                  //
  .put(updateProject)                 // Update project
  .delete(deleteProject);                // Delete project

// Nested task routes under a project
router.route("/:id/tasks")
  .get(getProjectTasks)                  // Get tasks for a project
  .post(createProjectTask);                     

router.route("/:id/tasks/:taskId")
  .put(updateProjectTask)                                // Update a task in project
  .delete(deleteProjectTask);                           // Delete a task in project

export default ProjectController