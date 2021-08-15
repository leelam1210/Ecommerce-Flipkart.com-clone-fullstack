import Products from "../models/productModel.js";
import slugify from 'slugify';
import Categories from "../models/categoryModel.js";


export const getProductsBySlugCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        await Categories.findOne({ slug: slug })
            .select("_id name type")
            .exec((error, category) => {
                if (error)
                    return res.status(400).json({ success: false, message: 'Not Slugs!', error: error });
                if (category) {
                    Products.find({ category: category._id })
                        .populate({ path: "category", select: "_id name" })
                        .exec((error, products) => {
                            if (error)
                                return res.status(400).json({ success: false, message: 'Not Products!', error: error });

                            if (category.type) {
                                if (products)
                                    res.status(200).json({
                                        products,
                                        priceRange: {
                                            under5k: 5000,
                                            under10k: 10000,
                                            under15k: 15000,
                                            under20k: 20000,
                                            under30k: 30000000,
                                        },
                                        productsByPrice: {
                                            under5k: products.filter(product => product.price <= 5000),
                                            under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                                            under30k: products.filter(product => product.price > 20000 && product.price <= 30000000),
                                        }
                                    });
                            } else {
                                res.status(200).json({ products });
                            }
                        });
                }
            });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const createProduct = async (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body });

    try {
        const { productId, name, price, description, category, quantity } = req.body;
        let productPictures = [];

        if (req.files.length > 0) {
            productPictures = req.files.map((file) => {
                return { image: file.filename };
            });
        }
        if (!productPictures || !name || !description || !quantity || !price)
            return res.status(400).json({ message: "Please enter complete information!" });

        const product = await Products.findOne({ productId: productId });
        if (product)
            return res.status(400).json({ message: "This code product already exists." });

        const newProduct = new Products({
            productId,
            name: name,
            slug: slugify(name).toLowerCase(),
            price,
            quantity,
            description,
            productPictures,
            category,
            createdBy: req.user._id,
        });
        // await newProduct.save();
        // // res.status(201).json({ product, files: req.files });
        // res.status(201).json({ newProduct });


        await newProduct.save((error, product) => {
            if (error) return res.status(400).json({ error });
            if (product)
                res.status(201).json({ newProduct });

        });
        // await newProduct.save();
        // res.status(201).json({ newProduct });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const getProductDetailsById = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) return res.status(404).json({ success: false, message: 'Not params productId' });
        await Products.findOne({ _id: productId })
            .exec((error, product) => {
                if (error) return res.status(error).json({ error });
                if (product) return res.status(200).json({ product });
            });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};