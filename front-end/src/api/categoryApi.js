import API from './API';

export const getAllCategoryApi = async () => {
    const url = '/category';
    const res = await API.get(url);
    return res;
};

export const addCategoryApi = async (formCategory) => {
    const url = '/category/create';
    const res = await API.post(url, formCategory);
    return res;
};
