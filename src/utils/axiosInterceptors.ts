import { ErrorMessage } from 'formik';
import { addRequest, removeRequest } from './../store/slices/loadingSlice';
import axios from "axios";
import config from '../data/config.json';
import tokenService from "../services/tokenService";

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
	(config) => {
		
	  let token = tokenService.getToken();
	  if (token) config.headers.Authorization = `${token}`;
	
	  addRequest();
	  return config;
	}
  );
  
  axiosInstance.interceptors.response.use(
	(response) => {
	  removeRequest();
	  console.log(response);
	  
	  return response;
	},
	(error) => {
		removeRequest();
	   /*  if (error.response.data.response.details[0] == 'Bad credentials') {
			
			console.log("Hatalı giriş");
		} */
        //const errorCode= error.response.data.response.details[0];
		
		return Promise.reject(error);
	}
  );
  
  export default axiosInstance;