import { cartTypes } from "./constants";
import store from "../store";

export const addToCart = (productInfo, newQty = null) => async (dispatch) => {
    // const { _id, name, image, price } = productInfo;
    const { cartItems } = store.getState().cart;
    // console.log("action::cartItems", cartItems)'

    try {
        dispatch({ type: cartTypes.ADD_TO_CART_REQUEST })
        //kiem tra trong gio hang co rooi  thi cong them 1
        const qty = cartItems[productInfo._id] ? parseInt(cartItems[productInfo._id].qty + newQty) : 1;
        cartItems[productInfo._id] = {
            ...productInfo,
            qty,
        };
        localStorage.setItem("cart", JSON.stringify(cartItems));

        dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: cartItems });
        // dispatch({type: cartTypes.ADD_TO_CART_SUCCESS,payload: { _id, productInfo }});
    } catch (error) {
        dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: error });
        console.log(error.response.data);
    }
};


export const updateCart = () => async dispatch => {
    const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
    if (!cartItems) return;
    try {
        dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: cartItems });

    } catch (error) {
        console.log(error.response.data);
    }
};