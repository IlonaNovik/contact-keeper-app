import axios from 'axios';

const axiosInstance = () => {
    const baseURL = 'https://keep-contacts-api.herokuapp.com/api/';
    let headers = {};

    if (localStorage.token) {
        headers.Authorization = `Bearer ${localStorage.token}`;
    }


    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers,
    })

    axiosInstance.interceptors.response.use(
        (response) => new Promise((resolve, reject) => {
            resolve(response)
        }), (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error.response)
                })
            }
            if (!error.response.status === 403) {
                localStorage.removeItem("token")
            } else {
                return new Promise((resolve, reject) => {
                    reject(error.response)
                })
            }

            window.location = '/login'
        }
    )
    return axiosInstance;
}

export default axiosInstance;