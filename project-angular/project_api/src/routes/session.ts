// import { checkRole } from './../middlewares/role';
// import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import SessionController from '../controller/SessionController';

const router = Router();

// Get all users
router.get('/', SessionController.getAllSession);
// router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

// Get one user
// router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);
// router.get('/:idUser', UserController.getUserById);

// Create a new user
// router.post('/', [checkJwt, checkRole(['admin'])], UserController.new);
router.post('/', SessionController.newSession);

// Edit user
// router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.edit);
// router.patch('/:idUser', UserController.editUser);

// Delete
// router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.delete);
// router.delete('/:idUser', UserController.deleteUser);

export default router;
