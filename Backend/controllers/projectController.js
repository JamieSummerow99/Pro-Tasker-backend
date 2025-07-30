import express from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from '../routes/projects.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);
router.route('/:id/tasks').get(getProjectTasks).post(createProjectTask);
router.route('/:id/tasks/:taskId').put(updateProjectTask).delete(deleteProjectTask);




export default router;




////Project Management:
//As a logged-in user, I can create new projects, giving them a name and description.
//I can view a dashboard of all the projects I have created.
//I can view the details of a single project.
//I can update or delete only the projects that I own.

//This line imports the "protect" middleware function f{"errorLabelSet":{},"errorResponse":{"index":0,"code":11000,"errmsg":"E11000 duplicate key error collection: ProTask.users index: githubId_1 dup key: { githubId: null }","keyPattern":{"githubId":1},"keyValue":{"githubId":null}},"index":0,"code":11000,"keyPattern":{"githubId":1},"keyValue":{"githubId":null}}rom the authMiddleware.js file located in the middleware directory. Middleware functions in Express are used to process requests before they reach the route handlers. The protect function is typically designed to check if a user is authenticated, such as by verifying a token or session. By importing it here, the code can use protect to secure specific routes, ensuring that only authorized users can access or modify project and task data. This is a common practice in web applications to enforce user authentication and protect sensitive resources.