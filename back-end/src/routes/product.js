import express from 'express';
const router = express.Router();
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
const __dirname = path.resolve();

import { authAdmin } from '../middlewares/authAdmin.js';
import auth from '../middlewares/authJwt.js';

import { getProductsBySlugCategory, createProduct, getProductDetailsById } from '../controllers/productController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "src/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
})

// const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.get('/products/:slug', getProductsBySlugCategory);
router.get('/product/:productId', getProductDetailsById);
router.post('/product/create', auth, authAdmin, upload.array('productPictures'), createProduct);

export default router;

