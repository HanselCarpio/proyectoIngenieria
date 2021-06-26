// import { checkRole } from './../middlewares/role';
// import { checkJwt } from './../middlewares/jwt';
import { ConsultController } from './../controller/ConsultController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', ConsultController.getAllConsults);

// Get one user
// router.get('/:id', UserController.getUserById);

// Create a new consult
router.post('/consult', ConsultController.newConsult);

// Edit user
// router.patch('/:id', UserController.editUser);

// Delete
// router.delete('/:id', UserController.deleteUser);

export default router;
