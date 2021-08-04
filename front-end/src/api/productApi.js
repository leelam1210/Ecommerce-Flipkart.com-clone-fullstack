import API from './API';

export const getProductsBySlugCategoryApi = async (slug) => {
    const url = `/products/${slug}`;
    const res = await API.get(url);
    return res;
};

export const getProductPageApi = async (payload) => {
    const { cid, type } = payload.params;
    const url = `/page/${cid}/${type}`;
    const res = await API.get(url);
    return res;
};


export const productByDetailByIdApi = async (productId) => {
    const url = `/product/${productId}`;
    const res = await API.get(url);
    return res;
};