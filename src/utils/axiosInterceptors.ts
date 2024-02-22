import axios from "axios";
import config from '../data/config.json';
import { error } from "console";
import tokenService from "../services/tokenService";
import { store } from "../store/configureStore";
import { decreaseRequestCount, increaseRequestCount } from "../store/slices/loadingSlice";

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
	(config) => {
	  let token = tokenService.getToken();
	  if (token) config.headers.Authorization = `${token}`;
	  //store.dispatch(increaseRequestCount());
	  return config;
	},
	(error) => {
	  console.error("Request Interceptor Error", error);
	  return Promise.reject(error);
	}
  );
  
  axiosInstance.interceptors.response.use(
	(response) => {
	  //store.dispatch(decreaseRequestCount());
	  return response;
	},
	(error) => {
	  //store.dispatch(decreaseRequestCount());
	  return Promise.reject(error);
	}
  );
  
  export default axiosInstance;