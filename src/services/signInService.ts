import { SignInModel } from "../models/Requests/SignInModel";
import { SignInResponse } from "../models/Responses/SignInResponse";
import axiosInstance from "../utils/axiosInterceptors";


export default class SignInService {
   
   add(newAuth: SignInModel){
        return axiosInstance.post<SignInResponse>("auth/signin", newAuth)
   }
   
}