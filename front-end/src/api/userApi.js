import API from './API';

export const getAddressApi = async () => {
    const url = '/address';
    const res = await API.get(url);
    return res;
};

export const addAddressApi = async (address) => {
    const url = '/address/create';
    const res = await API.post(url, address);
    return res;
};


export const addOrderApi = async (order) => {
    const url = '/addOrder';
    const res = await API.post(url, order);
    return res;
};

export const getOrdersApi = async () => {
    const url = '/getOrders';
    const res = await API.get(url);
    return res;
};

export const getOrderApi = async (payload) => {
    const { orderId } = payload;
    const url = `/getOrder/${orderId}`;
    const res = await API.get(url, payload);
    return res;
};