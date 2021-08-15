import { cartTypes } from "../actions/constants";

const initialStateCart = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updatingCart: false,
};

export const cartReducer = (state = initialStateCart, action) => {
    switch (action.type) {
        case cartTypes.ADD_TO_CART_REQUEST:
            return (state = {
                ...state,
                updatingCart: true,
            });
        case cartTypes.ADD_TO_CART_SUCCESS:
            return (state = {
                ...state,
                cartItems: action.payload,

                updatingCart: false,
            });
        case cartTypes.ADD_TO_CART_FAILURE:
            return (state = {
                ...state,
                updatingCart: false,
            });
        case cartTypes.RESET_CART:
            return (state = {
                ...initialStateCart,
            });
        // case cartTypes.REMOVE_CART_ITEM_SUCCESS:
        //     return (state = {
        //         cartItems: Object.keys(cartItems).filter((key) => key._id !== action.payload)
        //     });
        default:
            return state;
    }
};

// return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };