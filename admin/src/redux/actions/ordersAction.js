import { getOrdersApi, updateOrderApi } from "../../api/ordersApi";
import { orderTypes } from "./constants";


export const getCustomerOrders = () => async dispatch => {
    try {
        dispatch({ type: orderTypes.GET_CUSTOMER_ORDER_REQUEST });
        const { data } = await getOrdersApi();
        console.log(data);
        dispatch({ type: orderTypes.GET_CUSTOMER_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: orderTypes.GET_CUSTOMER_ORDER_FAILURE });
        console.log(error.response.data);
    }
};

export const updateOrder = (payload) => async dispatch => {
    try {
        dispatch({ type: orderTypes.UPDATE_CUSTOMER_ORDER_REQUEST });
        const { data } = await updateOrderApi(payload);
        console.log(data);
        dispatch(getCustomerOrders());
        dispatch({ type: orderTypes.UPDATE_CUSTOMER_ORDER_SUCCESS, payload: data.orders });

    } catch (error) {
        dispatch({ type: orderTypes.UPDATE_CUSTOMER_ORDER_FAILURE });
        console.log(error.response.data);
    }
};

