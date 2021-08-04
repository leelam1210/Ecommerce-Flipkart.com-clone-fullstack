import API from './API';

export const createPageApi = async (form) => {
    const url = '/page/create';
    const res = await API.post(url, form);
    return res;
};
