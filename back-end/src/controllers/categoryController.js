import Categories from "../models/categoryModel.js";
import slugify from "slugify";

const createCategoriChildren = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((c) => !c.parentId || c.parentId === "undefined" || c.parentId === "Select Category...");
        // category = categories.filter((c) => c.parentId == undefined);
    } else {
        category = categories.filter((c) => c.parentId == parentId);
    }
    // console.log('category:', category);

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

export const addCategory = async (req, res) => {
    try {
        const { name, parentId, type } = req.body;

        let categoryUrl;

        // xu ly tep don anh chi co 1 anh
        if (req.file)
            categoryUrl = process.env.API_IMG_CATEGORY + '/public/image/' + req.file.filename;

        if (!name)
            return res
                .status(400)
                .json({ success: false, message: "Missing name/parentId." });

        const category = await Categories.findOne({ name: name });
        if (category)
            return res.status(400).json({ msg: "This category already exists." });

        const newCategory = new Categories({
            name: name,
            parentId: !parentId ? undefined : parentId,
            slug: slugify(name).toLowerCase(),
            // slug: `${slugify(req.body.name)}-${shortid.generate()}`,
            type: type,
            categoryImage: categoryUrl,
            createdBy: req.user._id,
        });

        await newCategory.save();
        res.status(200).json({ newCategory });
    } catch (error) {
        // return res.status(500).json({ message: error.message });
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        // console.log(categories);
        if (categories) {
            const categoryList = createCategoriChildren(categories)
            res.status(200).json({ categoryList });
            // console.log(categoryList);
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateCategories = async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });
    try {
        const { _id, name, parentId, type } = req.body;
        const updatedCategories = [];
        //kiem tra xem ten co phai la dai dien cua mang khong
        if (name instanceof Array) {
            console.log(name);
            // console.log(type);
            // console.log(name.length);
            // console.log(_id);
            for (let i = 0; i < name.length; i++) {
                const category = {
                    name: name[i],
                    type: type[i],
                };
                if (parentId[i] !== "") {
                    category.parentId = parentId[i];
                }
                console.log('category: ', category);

                const updatedCategory = await Categories.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
                updatedCategories.push(updatedCategory);
            }
            return res.status(201).json({ success: true, updateCategories: updatedCategories });
        } else {
            const category = { name, type };
            if (parentId !== "") {
                category.parentId = parentId;
            }
            console.log('category1: ', category);
            const updatedCategories = await Categories.findOneAndUpdate({ _id }, category, { new: true });
            return res.status(201).json({ success: true, updatedCategories });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { ids } = req.body;
        const deletedCategories = [];
        for (let i = 0; i < ids.length; i++) {
            const deleteCategory = await Categories.findOneAndDelete({
                _id: ids[i]._id,
                // createdBy: req.user._id,
            });
            deletedCategories.push(deleteCategory);
        }

        if (deletedCategories.length == ids.length)
            return res.status(201).json({ success: true, message: "Categories removed" });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};