import { Router } from 'express';
import DetailsController from '../controller/DetailsController';

const router = Router();

// Get all users
router.get('/', DetailsController.getAllDetails);

// Get one user
// router.get('/:id', UserController.getUserById);

// Create a new consult
router.post('/detail', DetailsController.newDetails);

// Edit user
// router.patch('/:id', UserController.editUser);

// Delete
// router.delete('/:id', UserController.deleteUser);

export default router;
