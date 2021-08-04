import { categoryTypes } from "../actions/constants";
const initialState = {
    categories: [],
    isLoading: false,
    isAuthenticated: false,
};

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    if (parentId === "undefined" || !parentId || parentId === "Select Category...")
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: [],
            }
        ];

    categories.forEach((c) => {
        if (c._id === parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: [],
            };

            myCategories.push({
                ...c,
                children:
                    c.children.length > 0 ? [...c.children, newCategory] : [newCategory],
            });
        } else {
            myCategories.push({
                ...c,
                children: c.children
                    ? buildNewCategories(parentId, c.children, category)
                    : [],
            });
        }
    });
    return myCategories;
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryTypes.GET_ALL_CATEGORIES_SUCCESS:
            return (state = {
                ...state,
                categories: action.payload.categories,
            });
        case categoryTypes.ADD_NEW_CATEGORY_SUCCESS:
            // console.log(action.payload);
            const updatedCategories = buildNewCategories(
                action.payload.parentId,
                state.categories,
                action.payload,
            );
            console.log(updatedCategories);
            return (state = {
                ...state,
                categories: updatedCategories,
            });
        case categoryTypes.UPDATE_CATEGORIES_SUCCESS:
            return (state = {
                ...state,
            });
        case categoryTypes.DELETE_CATEGORIES_SUCCESS:
            return (state = {
                ...state,
            });
        default:
            return state;
    }
};
