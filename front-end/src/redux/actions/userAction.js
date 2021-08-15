import { userTypes, cartTypes } from './constants';
import { getAddressApi, addAddressApi, addOrderApi, getOrdersApi, getOrderApi } from "../../api/userApi";

export const getAddress = () => async dispatch => {
    try {
        dispatch({ type: userTypes.GET_USER_ADDRESS_REQUEST });
        const { data } = await getAddressApi();
        console.log(data);

        dispatch({ type: userTypes.GET_USER_ADDRESS_SUCCESS, payload: data.userAddress.address });
    } catch (error) {
        dispatch({ type: userTypes.GET_USER_ADDRESS_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
};

export const addAddress = (address) => async dispatch => {
    try {
        dispatch({ type: userTypes.ADD_USER_ADDRESS_REQUEST });
        const { data } = await addAddressApi(address);
        console.log(data);

        dispatch({ type: userTypes.ADD_USER_ADDRESS_SUCCESS, payload: data.address });

    } catch (error) {
        dispatch({ type: userTypes.ADD_USER_ADDRESS_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
};

export const addOrder = (order) => async dispatch => {
    try {
        dispatch({ type: userTypes.ADD_USER_ADDRESS_REQUEST });
        const { data } = await addOrderApi(order);
        console.log(data);
        dispatch({ type: cartTypes.RESET_CART });

        dispatch({ type: userTypes.ADD_USER_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: userTypes.ADD_USER_ORDER_FAILURE, payload: error.response.data });
        console.log(error.response.data);
    }
};

export const getOrders = () => async dispatch => {
    try {
        dispatch({ type: userTypes.GET_USER_ORDER_REQUEST });
        const { data } = await getOrdersApi();
        // console.log(data);

        dispatch({ type: userTypes.GET_USER_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({ type: userTypes.GET_USER_ORDER_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
};

export const getOrder = (payload) => async dispatch => {
    try {
        dispatch({ type: userTypes.GET_USER_ORDER_DETAILS_REQUEST });
        const { data } = await getOrderApi(payload);
        console.log(data);

        dispatch({ type: userTypes.GET_USER_ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({ type: userTypes.GET_USER_ORDER_DETAILS_FAILURE, payload: error.response.data.message });
        console.log(error.response.data);
    }
};

