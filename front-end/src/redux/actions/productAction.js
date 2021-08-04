import { getProductsBySlugCategoryApi, getProductPageApi, productByDetailByIdApi } from '../../api/productApi';
import { productTypes } from './constants';


export const getProductsBySlugCategory = (slug) => async dispatch => {
    try {
        const { data } = await getProductsBySlugCategoryApi(slug);
        console.log(data);
        dispatch({ type: productTypes.GET_PRODUCTS_BY_SLUG, payload: data });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const getProductPage = (payload) => async dispatch => {
    try {
        dispatch({ type: productTypes.GET_PRODUCT_PAGE_REQUEST });
        const { data } = await getProductPageApi(payload);
        console.log(data.page);
        dispatch({ type: productTypes.GET_PRODUCT_PAGE_SUCCESS, payload: data.page });
    } catch (error) {
        dispatch({ type: productTypes.GET_PRODUCT_PAGE_FAILURE });
        console.log(error.response.data);
    }
};

export const productByDetailById = (idProduct) => async dispatch => {

    try {
        dispatch({ type: productTypes.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        const { data } = await productByDetailByIdApi(idProduct);
        dispatch({ type: productTypes.GET_PRODUCT_DETAILS_BY_ID_SUCCESS, payload: data.product });

    } catch (error) {
        dispatch({ type: productTypes.GET_PRODUCT_DETAILS_BY_ID_FAILURE });
        console.log(error.response.data);
    }

};