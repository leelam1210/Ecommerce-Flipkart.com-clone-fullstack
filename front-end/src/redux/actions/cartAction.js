import { cartTypes } from "./constants";
import store from "../store";
import { getCartItemsApi, addToCartApi, removeCartItemApi } from "../../api/cartApi";

const getCartItems = () => async dispatch => {
    try {
        dispatch({ type: cartTypes.ADD_TO_CART_REQUEST });
        const res = await getCartItemsApi();
        if (res.status === 200) {
            console.log(res);
            dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: res.data.cartItems })
        }
    } catch (error) {
        console.log(error.response.data);
    }
};

export {
    getCartItems
}

export const removeCartItem = (item) => async dispatch => {
    try {
        dispatch({ type: cartTypes.REMOVE_CART_ITEM_REQUEST });
        const res = await removeCartItemApi(item);
        if (res.status === 202) {
            dispatch(getCartItems());
            dispatch({ type: cartTypes.REMOVE_CART_ITEM_SUCCESS });
        }
    } catch (error) {
        dispatch({ type: cartTypes.REMOVE_CART_ITEM_FAILURE });
        console.log(error.response.data);
    }
};

export const addToCart = (productInfo, newQty) => async (dispatch) => {
    // const { _id, name, image, price } = productInfo;
    const {
        cart: { cartItems },
        auth: { isAuthenticated }
    } = store.getState();
    // console.log("action::cartItems", cartItems)

    try {
        dispatch({ type: cartTypes.ADD_TO_CART_REQUEST })
        //kiem tra trong gio hang co rooi  thi xử lý quantity
        const qty = cartItems[productInfo._id] ? parseInt(cartItems[productInfo._id].qty + (newQty ? newQty : 1)) : 1;
        cartItems[productInfo._id] = {
            ...productInfo,
            qty,
        };
        if (isAuthenticated) {
            const payload = {
                // cartItems: Object.keys(cartItems).map((key, index) => {
                //     return {
                //         quantity: cartItems[key].qty,
                //         product: cartItems[key]._id
                //     }
                // })
                cartItems: [
                    {
                        product: productInfo._id,
                        quantity: qty,
                    }
                ]
            };

            console.log(payload);
            const response = await addToCartApi(payload);
            console.log(response);
            if (response.status === 201)
                dispatch(getCartItems());
        } else {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
        dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: cartItems });
        // dispatch({type: cartTypes.ADD_TO_CART_SUCCESS,payload: { _id, productInfo }});
    } catch (error) {
        dispatch({ type: cartTypes.ADD_TO_CART_FAILURE, payload: error });
        console.log(error.response.data);
    }
};


export const updateCart = () => async dispatch => {
    const { isAuthenticated } = store.getState().auth;
    let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
    if (!cartItems) return;
    try {
        if (isAuthenticated) {
            localStorage.removeItem('cart');
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            product: cartItems[key]._id,
                            quantity: cartItems[key].qty,
                        };
                    }),
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await addToCartApi(payload);
                    if (res.status === 201) {
                        dispatch(getCartItems());

                    }
                }
            } else {
                dispatch(getCartItems());
            }
        } else {
            if (cartItems) {
                dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: cartItems });
            }
        }
    } catch (error) {
        console.log(error.response.data);
    }
};