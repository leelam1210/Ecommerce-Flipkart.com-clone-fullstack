import { addProductApi, getAllProductApi } from '../../api/productApi';
import { productTypes } from './constants';

export const addProduct = (formProduct) => async dispatch => {
    try {
        dispatch({ type: productTypes.ADD_PRODUCT_REQUEST });
        const { data } = await addProductApi(formProduct);
        console.log(data);

    } catch (error) {
        dispatch({ type: productTypes.ADD_PRODUCT_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
};

export const getAllProducts = () => async dispatch => {
    try {
        dispatch({ type: productTypes.GET_ALL_PRODUCTS_REQUEST });
        const { data } = await getAllProductApi();
        console.log(data);

    } catch (error) {
        dispatch({ type: productTypes.GET_ALL_PRODUCTS_FAILURE, payload: error.response.data });
        console.log(error.response.data.message);
    }
};
