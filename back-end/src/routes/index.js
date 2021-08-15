import authRouter from './auth.js';
import CategoryRouter from './category.js';
import ProductRouter from './product.js';
import CartRouter from './cart.js';
import adminRouter from './admin/authAdmin.js';
import initialDataRouter from './admin/initialData.js';
import orderAdminRouter from './admin/orderAdmin.js';
import PageRouter from './admin/page.js';
import AddressRouter from './address.js';
import OrdersRouter from './order.js';

const route = (app) => {
    app.use('/api', authRouter);
    app.use('/api', ProductRouter);
    app.use('/api', CartRouter);
    app.use('/api', CategoryRouter);
    app.use('/api', adminRouter);
    app.use('/api', initialDataRouter);
    app.use('/api', PageRouter);
    app.use('/api', AddressRouter);
    app.use('/api', OrdersRouter);
    app.use('/api', orderAdminRouter);

}
export default route;