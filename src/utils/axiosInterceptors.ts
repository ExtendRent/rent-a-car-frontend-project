import axios from "axios";
import config from '../data/config.json';
import { error } from "console";

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
});

axiosInstance.interceptors.request.use(config => {
	
	return config;
},
error => {
	console.error("Request Interceptor Error", error);
    return Promise.reject(error);
}
);

axiosInstance.interceptors.response.use(
	response => {
	
		return response;
	},
	error => {
		console.error("Response Interceptor Error", error);
    	return Promise.reject(error);
	},
);

export default axiosInstance;