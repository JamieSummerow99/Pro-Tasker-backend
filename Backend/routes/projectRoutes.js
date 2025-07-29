import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkProjectOwnership } from '../middleware/ownershipMiddleware.js';

const router = express.Router();
router.use(protect);

router.route('/').get(getProjects).post(createProject);
router
  .route('/:id')
  .get(checkProjectOwnership, getProject)
  .put(checkProjectOwnership, updateProject)
  .delete(checkProjectOwnership, deleteProject);

export default router;