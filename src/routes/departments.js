import express from 'express';
import departmentController from '../controllers/departments.js';


const router = express.Router();

router.post('/create', departmentController.createDepartment);
router.get('/get/:id', departmentController.getDepartmentById);
router.get('/get', departmentController.getAllDepartments);
router.put('/update/:id', departmentController.editDepartment);
router.delete('/delete/:id', departmentController.deleteDepartment);

export default router;