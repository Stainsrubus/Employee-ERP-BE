import express from 'express'
import EmployeeRoutes from './employees.js'
import ProjectRoutes from './projects.js'
import DepartmentRoutes from './departments.js'

const router = express.Router()

router.use('/employee',EmployeeRoutes)
router.use('/project',ProjectRoutes)
router.use('/department',DepartmentRoutes)

export default router