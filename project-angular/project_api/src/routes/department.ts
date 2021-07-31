
import { Router } from 'express';
import DepartmentController from '../controller/DepartmentController';

const router = Router();

// Get all users
router.get('/', DepartmentController.getAllDepart);

router.post('/', DepartmentController.newDepart);


export default router;
