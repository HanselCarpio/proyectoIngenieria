// import { checkRole } from './../middlewares/role';
// import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', UserController.getAllUser);
// router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

// Get one user
// router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);
router.get('/:idUser', UserController.getUserById);

// Create a new user
// router.post('/', [checkJwt, checkRole(['admin'])], UserController.new);
router.post('/', UserController.newUser);

// Edit user
// router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.edit);
router.patch('/:idUser', UserController.editUser);

// Delete
// router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.delete);
router.delete('/:idUser', UserController.deleteUser);

export default router;
