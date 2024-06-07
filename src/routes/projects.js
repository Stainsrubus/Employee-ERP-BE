import express from 'express'
import ProjectController from '../controllers/projects.js'

const router = express.Router();

router.post(
    "/createProject",
    ProjectController.createProject
);
router.get(
    "/getAllProjects",ProjectController.getAllProjects
)
router.get(
    "/getproject/:id",ProjectController.getProjectById
)
router.put(
    "/editProject/:id",ProjectController.editProject
)
router.delete("/delete/:id",ProjectController.deleteProject)
export default router; 