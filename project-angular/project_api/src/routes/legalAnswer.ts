// import { checkRole } from './../middlewares/role';
// import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import LegalAnswerController from '../controller/LegalAnswerController';

const router = Router();

// Get all users
router.get('/', LegalAnswerController.getAllLegalAnswer);
// router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

// Get one user
// router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);
// router.get('/:idUser', UserController.getUserById);

// Create a new user
// router.post('/', [checkJwt, checkRole(['admin'])], UserController.new);
router.post('/', LegalAnswerController.newLegalAnswer);

// Edit user
// router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.edit);
// router.patch('/:idRespuesta', LegalAnswerController.edit);

// Delete
// router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.delete);
router.delete('/:idRespuesta', LegalAnswerController.deleteRespuesta);

export default router;
