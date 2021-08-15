import express from "express";
const router = express.Router();
import auth from '../../middlewares/authJwt.js';
import { authAdmin } from '../../middlewares/authAdmin.js';
import { updateOrder, getCustomerOrders } from '../../controllers/admin/orderAdminController.js';

router.post('/order/update', auth, authAdmin, updateOrder);
router.get('/order/getCustomerOrders', auth, authAdmin, getCustomerOrders);

export default router;