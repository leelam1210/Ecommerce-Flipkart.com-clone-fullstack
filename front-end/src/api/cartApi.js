import API from './API';

export const getCartItemsApi = async () => {
    const url = '/cart/cartItems';
    const res = await API.get(url);
    return res;
};

export const addToCartApi = async (payload) => {
    const url = '/cart/addtocart';
    const res = await API.post(url, payload);
    return res;
};


export const removeCartItemApi = async (item) => {
    const url = '/cart/remove';
    const res = await API.post(url, item);
    return res;
};