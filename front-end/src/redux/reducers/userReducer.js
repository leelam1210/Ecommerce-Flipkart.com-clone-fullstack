import { userTypes } from "../actions/constants";

const initialStateUser = {
    address: [],
    orders: [],
    orderDetails: {},
    isLoading: false,
    orderFetching: false,
    placedOrderId: null,
};

export const userReducer = (state = initialStateUser, action) => {
    switch (action.type) {
        case userTypes.GET_USER_ADDRESS_REQUEST:
            return (state = {
                ...state,
                isLoading: true,
            });
        case userTypes.GET_USER_ADDRESS_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                address: action.payload,
            });
        case userTypes.GET_USER_ADDRESS_FAILURE:
            return (state = {
                ...state,
                isLoading: false,
            });
        case userTypes.GET_USER_ORDER_REQUEST:
            return (state = {
                ...state,
                orderFetching: true,
            });
        case userTypes.GET_USER_ORDER_SUCCESS:
            return (state = {
                ...state,
                orders: action.payload,
                orderFetching: false,
            });
        case userTypes.GET_USER_ORDER_FAILURE:
            return (state = {
                ...state,
                orderFetching: false,
            });
        case userTypes.GET_USER_ORDER_DETAILS_REQUEST:
            return (state = {
                ...state,
                isLoading: true,
            });
        case userTypes.GET_USER_ORDER_DETAILS_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                orderDetails: action.payload,
            });
        case userTypes.GET_USER_ORDER_DETAILS_FAILURE:
            return (state = {
                ...state,
                isLoading: false,
            });
        case userTypes.ADD_USER_ORDER_SUCCESS:
            return (state = {
                ...state,
                placedOrderId: action.payload.order._id,
            });
        default:
            return state;
    }
};