import { getAllCategoryApi, addCategoryApi, updateCategoryApi, deletaCategoriesApi } from '../../api/categoryApi';
import { categoryTypes } from './constants';

const getAllCategory = () => async dispatch => {
    try {
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_REQUEST });
        const { data } = await getAllCategoryApi();
        console.log(data);
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_SUCCESS, payload: { categories: data.categoryList } });

    } catch (error) {
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_FAILURE, payload: error.response.data.message });
        console.log(error.response.data.message);
    }
};

export {
    getAllCategory
};

export const addCategory = (formCategory) => async dispatch => {
    try {
        dispatch({ type: categoryTypes.ADD_NEW_CATEGORY_REQUEST });
        const { data } = await addCategoryApi(formCategory);
        console.log(data);
        dispatch({ type: categoryTypes.ADD_NEW_CATEGORY_SUCCESS, payload: data.newCategory });

    } catch (error) {
        dispatch({ type: categoryTypes.ADD_NEW_CATEGORY_FAILURE, payload: error.response.data });
        console.log(error.response.data);
    }
};

export const updateCategories = (form) => async dispatch => {
    try {
        dispatch({ type: categoryTypes.UPDATE_CATEGORIES_REQUEST });
        const { data } = await updateCategoryApi(form);
        // console.log(data.updatedCategory);
        dispatch(getAllCategory());
        dispatch({ type: categoryTypes.UPDATE_CATEGORIES_SUCCESS, payload: null });
    } catch (error) {
        dispatch({ type: categoryTypes.UPDATE_CATEGORIES_FAILURE, payload: error.response.data });
        console.log(error.response.data);
    }
};

export const deletaCategories = (ids) => async dispatch => {
    try {
        dispatch({ type: categoryTypes.DELETE_CATEGORIES_REQUEST });
        const { data } = await deletaCategoriesApi({ ids });
        // console.log(data);
        dispatch({ type: categoryTypes.DELETE_CATEGORIES_SUCCESS, payload: null });
        dispatch(getAllCategory());
    } catch (error) {
        dispatch({ type: categoryTypes.DELETE_CATEGORIES_FAILURE, payload: error.response.data });
        console.log(error.response.data);
    }
};
