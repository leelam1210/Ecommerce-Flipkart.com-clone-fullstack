import express from "express";
const router = express.Router();
import { validateSigninRequest, validateSignupRequest, isRequestValidated } from '../middlewares/validator/auth.js';

import { signIn, signUp, signOut } from '../controllers/authController.js';

router.post('/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/signout', signOut)

export default router;
