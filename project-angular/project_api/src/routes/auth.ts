// import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();

// login
router.post('/login', AuthController.login);
//forgot password
// router.put('/forgot-password', AuthController.forgotPassword);
//create new password
// router.put('/new-password', AuthController.createNewPassword);
// Change password
// router.post('/change-password', [checkJwt], AuthController.changePassword);
// router.post('/change-password', AuthController.changePassword);

//registro login
// router.post('/session', AuthController.session);
export default router;