// import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();

// login
router.post('/login', AuthController.login);


router.get('/anualResume', AuthController.getAnualResume);
router.get('/totalConsultas', AuthController.getTotalConsultas);
router.get('/resumenConsultas', AuthController.getResumenConsultas);
router.get('/resumenContratos', AuthController.getResumenContratos);
export default router;