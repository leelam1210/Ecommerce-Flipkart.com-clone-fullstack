import API from './API';

export const addProductApi = async (formProduct) => {
    const url = '/product/create';
    const res = await API.post(url, formProduct);
    return res;
};

export const getAllProductApi = async () => {
    const url = '/product';
    const res = await API.get(url,);
    return res;
};
