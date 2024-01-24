import { SignInModel } from "../models/Requests/SignInModel";
import axiosInstance from "../utils/axiosInterceptors";


export default class SignInService {
   
   add(newAuth: SignInModel){
        return axiosInstance.post<SignInModel>("auth/signin", newAuth)
   }
   
}