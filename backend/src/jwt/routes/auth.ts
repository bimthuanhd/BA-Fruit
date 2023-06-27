import express, { Router } from 'express'
import MiddlewareController from '../../jwt/controllers/MiddlewareController';
import AuthController from '../../jwt/controllers/AuthController'

const router: Router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.requestRefreshToken);
router.post('/logout', MiddlewareController.verifyToken, AuthController.logoutUser);

export default router