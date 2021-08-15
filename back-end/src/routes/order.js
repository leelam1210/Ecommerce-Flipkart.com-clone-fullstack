import express from 'express';
const router = express.Router();

import { userPermission } from '../middlewares/authAdmin.js';
import auth from '../middlewares/authJwt.js';

import { addOrder, getOrders, getOrder } from '../controllers/orderController.js';


router.post('/addOrder', auth, userPermission, addOrder);
router.get('/getOrder/:orderId', auth, userPermission, getOrder);
router.get('/getOrders', auth, userPermission, getOrders);



export default router;