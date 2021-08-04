import axios from 'axios';
import { authTypes } from '../redux/actions/constants';
import store from '../redux/store';
const API = axios.create({
    baseURL: 'http://localhost:5500/api',
    headers: {
        'content-type': 'application/json',
    },

});
API.interceptors.request.use((req) => {
    // if (localStorage.getItem('authAdmin')) {
    //     req.headers.Authorization = `${JSON.parse(localStorage.getItem('authAdmin')).accessToken}`;
    // }

    const { auth } = store.getState();
    if (auth.authData.accessToken) {
        req.headers.Authorization = `${auth.authData.accessToken}`;
    }
    return req;
});

// Custom middleware for requests (this one just logs the error).
API.interceptors.request.use(async (config) => {
    // Handle token here ......
    return config;
});

// Custom middleware for responses (this one just logs the error).
API.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
    return response;
}, (error) => {
    // Handle errors
    console.log(error.response);
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
        localStorage.clear();
        store.dispatch({ type: authTypes.LOGOUT_SUCCESS });
    }

    return Promise.reject(error);
    // throw error;
});


export default API;










// import axios from 'axios';
// import { api } from '../urlConfig';
// import store from '../store';
// import { authConstants } from '../actions/constants';

// const token = window.localStorage.getItem('token');

// const axiosIntance = axios.create({
//     baseURL: api,
//     headers: {
//         'Authorization': token ? `Bearer ${token}` : ''
//     }
// });

// axiosIntance.interceptors.request.use((req) => {
//     const { auth } = store.getState();
//     if(auth.token){
//         req.headers.Authorization = `Bearer ${auth.token}`;
//     }
//     return req;
// })

// axiosIntance.interceptors.response.use((res) => {
//     return res;
// }, (error) => {
//     console.log(error.response);
//     const status = error.response ? error.response.status : 500;
//     if(status && status === 500){
//         localStorage.clear();
//         store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
//     }
//     return Promise.reject(error);
// })

// export default axiosIntance;
