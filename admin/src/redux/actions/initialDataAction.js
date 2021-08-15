import { initialDataApi } from "../../api/initialDataApi";
import {
    categoryTypes,
    productTypes,
    initialDataTypes,
    orderTypes,
} from "./constants";

export const getInitialData = () => async dispatch => {
    try {
        const { data } = await initialDataApi();
        console.log(data);
        const { categories, products, orders } = data;

        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_SUCCESS, payload: { categories } });
        dispatch({ type: productTypes.GET_ALL_PRODUCTS_SUCCESS, payload: { products } });
        dispatch({ type: orderTypes.GET_CUSTOMER_ORDER_SUCCESS, payload: { orders } });


    } catch (error) {
        dispatch({ type: initialDataTypes.GET_ALL_INITIAL_DATA_FAILURE, payload: error.response.data });
        console.log(error.response.data);
    }
};
