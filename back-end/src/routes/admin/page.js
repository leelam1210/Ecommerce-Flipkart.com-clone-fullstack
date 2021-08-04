import express from "express";
const router = express.Router();
import auth from '../../middlewares/authJwt.js';
import { authAdmin } from '../../middlewares/authAdmin.js';
import { createPage, getPage } from '../../controllers/admin/pageController.js';
import { upload } from "../../middlewares/index.js";


router.post('/page/create', upload.fields([
    {
        name: "banners",
        maxCount: 10,
    },
    {
        name: "products",
        maxCount: 10,
    }
]), auth, authAdmin, createPage);
router.get('/page/:category/:type', getPage);

export default router;