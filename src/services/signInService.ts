import { AxiosResponse } from "axios";
import { SignInModel } from "../models/Requests/SignIn/SignInModel";
import { SignInResponse } from "../models/Responses/SignIn/SignInResponse";
import axiosInstance from "../utils/axiosInterceptors";

export interface ErrorResponse {
   errorCode: number;
   message: string;
 }
export default class SignInService {
   
   add(newAuth: SignInModel){
        return axiosInstance.post<SignInResponse>("auth/signin", newAuth)
   }
   isUserTrue(param:{email : string,password:string}){
      return axiosInstance.get<AxiosResponse<boolean>>("auth/isUserTrue",{params: param});
  }
}