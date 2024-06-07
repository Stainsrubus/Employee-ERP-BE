
import express from 'express';
import EmployeeController from '../controllers/employees.js';
import Auth from '../common/auth.js';


const router = express.Router();


router.post(
    "/signup",
    EmployeeController.signup
  );
  router.post(
    "/create",
    EmployeeController.createEmployee
  );
  router.post("/login", EmployeeController.login);
  router.get(
    "/getallemployees",
    Auth.validate,
    Auth.adminGaurd,
    EmployeeController.getAllEmployees
  );
  router.get(
    "/getemployees/:id",
    Auth.validate,
    Auth.adminGaurd,
    EmployeeController.getEmployeeById
  );
  router.put(
    "/editemployee/:id",
    Auth.validate,
    EmployeeController.updateEmployee
  );
  router.delete(
    "/delete/:id",
    Auth.validate,
    Auth.adminGaurd,
    EmployeeController.deleteEmployee
  );

export default router;
