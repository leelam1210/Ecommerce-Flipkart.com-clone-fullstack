import express from 'express';
const router = express.Router();

import { userPermission } from '../middlewares/authAdmin.js';
import auth from '../middlewares/authJwt.js';

import { addAddress, getAddress } from '../controllers/addressController.js';


router.post('/address/create', auth, userPermission, addAddress);
router.get('/address', auth, userPermission, getAddress);

export default router;