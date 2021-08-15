import axios from 'axios';
import store from '../redux/store';
import { authTypes } from '../redux/actions/constants';
const API = axios.create({
    baseURL: 'http://localhost:5500/api',
    headers: {
        'content-type': 'application/json',
    },
});
API.interceptors.request.use((req) => {
    // if (localStorage.getItem('authUser')) {
    //     req.headers.Authorization = `${JSON.parse(localStorage.getItem('authUser')).accessToken}`;
    // }
    const { auth } = store.getState();
    if (auth.authData.accessToken) {
        req.headers.Authorization = `${auth.authData.accessToken}`;
    }
    return req;

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
