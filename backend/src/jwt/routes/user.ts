import express, { Router } from 'express'
import MiddlewareController from '../../jwt/controllers/MiddlewareController';
import UserController from '../../jwt/controllers/UserController'

const router: Router = express.Router();

router.get('/list', MiddlewareController.verifyToken, UserController.getUsers_neqDelete);
router.get('/get/:_id', UserController.getUser);
router.delete('/delete/:_id',
  MiddlewareController.verifyToken_AdminAuth,
  UserController.deleteUser);

export default router