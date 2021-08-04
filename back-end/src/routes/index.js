import authRouter from './auth.js';
import CategoryRouter from './category.js';
import ProductRouter from './product.js';
import CartRouter from './cart.js';
import adminRouter from './admin/authAdmin.js';
import initialDataRouter from './admin/initialData.js';
import PageRouter from './admin/page.js';

const route = (app) => {
    app.use('/api', authRouter);
    app.use('/api', ProductRouter);
    app.use('/api', CartRouter);
    app.use('/api', CategoryRouter);
    app.use('/api', adminRouter);
    app.use('/api', initialDataRouter);
    app.use('/api', PageRouter);

}
export default route;