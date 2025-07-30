import Project from '../models/Project.js';

function projectsRouter() {
  const router = express.Router();

  // Middleware to protect routes
  router.use(authMiddleware);

  // Get all projects
  router.get("/", async (req, res) => {
    try {
      const projects = await Project.find().populate('owner collaborators');
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  });

  // Create a new project
  // POST /api/projects
  router.post("/", async (req, res) => {
    try {
      const newProject = await Project.create({
        ...req.body,
        owner: req.user._id,
      });
      res.json(newProject);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  });

  // Update an existing project
  router.put("/:id", async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        { ...req.body, owner: req.user._id },
        { new: true }
      ).populate('owner collaborators');
      res.json(updatedProject);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  });

  // Delete a project
  router.delete("/:id", async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  });

  // Get a single project by ID
  router.get("/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('owner collaborators');
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  });

  return router;
}


export const create = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to access this project' });
    }
    req.project = project;
    next();
  } catch (err) {
    next(err);
  }
};

export default projectsRouter;// Remove export default router; since 'router' is not defined in this file