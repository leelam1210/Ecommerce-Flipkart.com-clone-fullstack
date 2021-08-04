import { getAllCategoryApi, addCategoryApi } from '../../api/categoryApi';
import { categoryTypes } from './constants';

export const getAllCategory = () => async dispatch => {
    try {
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_REQUEST });
        const { data } = await getAllCategoryApi();
        console.log(data);
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_SUCCESS, payload: { categories: data.categoryList } });

    } catch (error) {
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
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
