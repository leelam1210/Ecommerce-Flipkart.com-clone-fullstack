import { orderTypes } from '../actions/constants';

const initialStateOrders = {
    orders: [],
};

export const ordersReducer = (state = initialStateOrders, action) => {
    switch (action.type) {
        case orderTypes.GET_CUSTOMER_ORDER_SUCCESS:
            return (state = {
                ...state,
                orders: action.payload.orders,
            })
        default:
            return state;
    }
};
