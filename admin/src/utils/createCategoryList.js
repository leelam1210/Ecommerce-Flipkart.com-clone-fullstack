export const CategoryList = (categories, options = []) => {
    categories.forEach(category => {
        options.push({
            value: category?._id,
            name: category?.name,
            parentId: category?.parentId,
            type: category?.type
        });
        if (category.children.length > 0) {
            CategoryList(category.children, options)
        }
    });
    return options;
};
