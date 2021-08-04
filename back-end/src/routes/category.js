import express from 'express';
const router = express.Router();
import { authAdmin } from '../middlewares/authAdmin.js';
import auth from '../middlewares/authJwt.js';
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
const __dirname = path.resolve();

import { addCategory, getCategories, updateCategories, deleteCategory } from '../controllers/categoryController.js';

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

router.get('/category', getCategories);
router.post('/category/create', auth, authAdmin, upload.single('categoryImage'), addCategory);
router.patch('/category/update', auth, authAdmin, upload.array('categoryImage'), updateCategories);
router.post('/category/delete', auth, authAdmin, deleteCategory);

// router.route('/category')
//     // .patch(auth, authAdmin, upload.array('categoryImage'), updateCategories)
//     .delete(auth, authAdmin, deleteCategory);

export default router;