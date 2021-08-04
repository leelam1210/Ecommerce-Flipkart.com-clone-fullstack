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

export const updateCategoryApi = async (form) => {
    const url = '/category/update';
    const res = await API.patch(url, form);
    return res;
};

export const deletaCategoriesApi = async (ids) => {
    const url = '/category/delete';
    const res = await API.post(url, ids);
    return res;
};
