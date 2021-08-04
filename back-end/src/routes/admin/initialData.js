import express from "express";
const router = express.Router();
import auth from '../../middlewares/authJwt.js';
import { authAdmin } from '../../middlewares/authAdmin.js';


import { initialData } from '../../controllers/admin/initialDataController.js';

router.get('/initialdata', auth, authAdmin, initialData);
export default router;