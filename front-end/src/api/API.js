import axios from 'axios';
const API = axios.create({
    baseURL: 'http://localhost:5500/api',
});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('authAdmin')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('authAdmin')).accessToken}`;
    }

    return req;
});


export default API;
