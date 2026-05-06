import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:8081/api',
})

api.interceptors.request.use((config)=>{


    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response)=>{
    // 🔍 Checkpoint 3: Data arriving in Browser
    console.log("DEBUG: API Response Data:", response.data);

    return response;
},
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error("DEBUG: API Error:", error.response?.data || error.message);

        return Promise.reject(error);
    }
);

export default api;