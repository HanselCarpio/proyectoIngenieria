
import { Router } from 'express';
import ClasificatorController from '../controller/ClasificatorController';

const router = Router();

// Get all users
router.get('/', ClasificatorController.getAllClasi);

router.post('/', ClasificatorController.newClasi);


export default router;
