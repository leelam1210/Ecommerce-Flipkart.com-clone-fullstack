import Products from "../../models/productModel.js";
import Categories from "../../models/categoryModel.js";
// import Orders from "../models/orderModel.js";

const createCategoriChildren = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((c) => !c.parentId || c.parentId === "undefined" || c.parentId === "Select Category...");
        // category = categories.filter((c) => c.parentId == undefined);
    } else {
        category = categories.filter((c) => c.parentId == parentId);
    }
    // console.log(category);

    // for (let cate of category) {
    //     categoryList.push({
    //         _id: cate._id,
    //         name: cate.name,
    //         slug: cate.slug,
    //         parentId: cate.parentId,
    //         // type: cate.type,
    //         children: createCategoriChildren(categories, cate._id),
    //     });
    // }
    // return categoryList;

    category.forEach((cate) => {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategoriChildren(categories, cate._id),
        });
    });
    return categoryList;
};

export const initialData = async (req, res) => {
    try {
        const categories = await Categories.find({}).exec();
        const products = await Products.find({})
            .select("_id productId name price quantity slug description productPictures category")
            .populate({ path: "category", select: "_id name" })
            .exec();
        res.status(200).json({
            categories: createCategoriChildren(categories),
            products,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};