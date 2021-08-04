import express from 'express';
const router = express.Router();

import { userPermission } from '../middlewares/authAdmin.js';
import auth from '../middlewares/authJwt.js';

import { getToCart, addItemToCart } from '../controllers/cartController.js';


router.get('/cart', auth, userPermission, getToCart);
router.post('/cart/addtocart', auth, userPermission, addItemToCart);

export default router;