import API from './API';

export const getOrdersApi = async (form) => {
    const url = '/order/getCustomerOrders';
    const res = await API.get(url, form);
    return res;
};

export const updateOrderApi = async (form) => {
    const url = '/order/update';
    const res = await API.post(url, form);
    return res;
};
