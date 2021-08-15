import express from 'express';
const router = express.Router();

import { userPermission } from '../middlewares/authAdmin.js';
import auth from '../middlewares/authJwt.js';

import { getToCart, addItemToCart, removeCartItems } from '../controllers/cartController.js';


router.get('/cart/cartItems', auth, userPermission, getToCart);
router.post('/cart/addtocart', auth, userPermission, addItemToCart);
router.post('/cart/remove', auth, userPermission, removeCartItems);

export default router;