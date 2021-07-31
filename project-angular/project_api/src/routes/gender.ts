
import { Router } from 'express';
import GenderController from '../controller/GenderController';

const router = Router();

// Get all users
router.get('/', GenderController.getAllGender);

router.post('/', GenderController.newGender);


export default router;
