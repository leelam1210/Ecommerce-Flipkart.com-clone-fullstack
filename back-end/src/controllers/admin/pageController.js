import Page from '../../models/pageModel.js';


export const createPage = async (req, res) => {
    const { banners, products } = req.files;
    const { category, type, title, description } = req.body;
    try {
        if (!title || !description || !banners || !products)
            return res
                .status(400)
                .json({ success: false, message: "Please enter full information!" });
        // const categories = await Page.findOne({ category: category });
        // if (categories)
        //     return res.status(400).json({ msg: "This category page already exists." });

        if (banners.length > 0) {
            req.body.banners = banners.map((banner, index) => ({
                image: `/public/image/${banner.filename}`,
                navigateTo: `/bannerClicked?categoryId=${category}&type=${type}`,
            }));
        }
        if (products && products.length > 0) {
            req.body.products = products.map((product, index) => ({
                image: `/public/image/${product.filename}`,
                navigateTo: `/productClicked?categoryId=${category}&type=${type}`,
            }));
        }
        // res.status(200).json({ body: req.body })
        req.body.createdBy = req.user._id;
        await Page.findOne({ category: category }).exec((error, page) => {
            if (error) return res.status(400).json({ error });
            if (page) {
                Page.findOneAndUpdate({ category: category }, req.body).exec((error, updatedPage) => {
                    if (error) return res.status(400).json({ error });
                    if (updatedPage) {
                        return res.status(201).json({ page: updatedPage, message: 'Update Success' });
                    }
                });
            } else {
                const newPage = new Page(req.body);
                newPage.save((error, page) => {
                    if (error) return res.status(400).json({ success: false, error: error });
                    if (page)
                        res.status(201).json({ page });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getPage = async (req, res) => {
    const { category, type } = req.params;
    try {
        if (type === 'Page')
            await Page.findOne({ category: category }).exec((error, page) => {
                if (error) return res.status(400).json({ error: error, message: "Failure!!" });
                if (page) return res.status(200).json({ page });
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};