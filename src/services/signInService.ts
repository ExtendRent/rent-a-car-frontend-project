import { SignInModel } from "../models/Requests/SignIn/SignInModel";
import { SignInResponse } from "../models/Responses/SignIn/SignInResponse";
import axiosInstance from "../utils/axiosInterceptors";


export default class SignInService {
   
   add(newAuth: SignInModel){
        return axiosInstance.post<SignInResponse>("auth/signin", newAuth)
   }
   
}