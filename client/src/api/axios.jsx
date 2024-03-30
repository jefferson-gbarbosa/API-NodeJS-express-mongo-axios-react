import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/auth',
    // headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// let refresh = false;

// api.interceptors.response.use(resp => resp, async error => {
//     if (error.response.status === 401 && !refresh) {
//         refresh = true;

//         const response = await api.get('/refresh');
//         console.log(response.data)

//         if (response.data.status === 200) {
//             api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

//             return axios(error.config);
//         }
//     }
//     refresh = false;
//     return error;
// });

export default api;