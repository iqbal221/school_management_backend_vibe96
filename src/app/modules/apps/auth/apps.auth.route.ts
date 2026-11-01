import express from 'express';

import auth from '../../../middlewares/auth';
import { AuthController } from './apps.auth.controller';


const router = express.Router();

router.post(
  '/register',
  AuthController.registerUser
);

router.post(
  '/login',
  AuthController.loginUser
);

router.get('/', auth(), AuthController.GetUser);

export const AppsAuthRoutes = router;
