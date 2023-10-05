import axios from "axios";
const axiosInstance = axios.create();
let refreshStatus = false;

axiosInstance.interceptors.response.use(res => res, async error => {
    if (error.response?.data?.statusCode === 401 && !refreshStatus) {
         refreshStatus = true;
         const response = await axios.post('http://localhost:5000/api/v1/auth/refresh-token', {}, {withCredentials: true});

        //this backend response data contain accessToken
        const {data} = response.data
        
        if (response.data.statusCode === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

            return axios(error.config);
        }
    }
    refreshStatus = false;
    return error;
});

export default axiosInstance



