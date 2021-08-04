import API from './API';
// const API = axios.create({
//     baseURL: 'http://localhost:5500/api',
// });
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('authAdmin')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('authAdmin')).accessToken}`;
//     }

//     return req;
// });

export const signUpApi = async (formSignup) => {
    const url = '/signup';
    const res = await API.post(url, formSignup);
    return res;
};

export const signInApi = async (formSignin) => {
    const url = '/signin';
    const res = await API.post(url, formSignin);
    return res;
};

export const signOutApi = async () => {
    const url = '/signout';
    const res = await API.post(url);
    return res;
};
