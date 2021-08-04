import API from './API';

export const initialDataApi = async () => {
    const url = '/initialdata';
    const res = await API.get(url);
    return res;
};
