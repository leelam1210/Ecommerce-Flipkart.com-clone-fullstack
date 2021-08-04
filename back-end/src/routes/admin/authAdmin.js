import express from "express";
const router = express.Router();
import { validateSigninRequest, validateSignupRequest, isRequestValidated } from '../../middlewares/validator/auth.js';


import { signIn, signUp, signOut } from '../../controllers/admin/authAdminController.js';

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/admin/signout', signOut)
export default router;
