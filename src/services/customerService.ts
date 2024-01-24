import { AddCustomerModel } from "../models/Requests/AddCustomerModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CustomerService {
   
   add(newCustomer: AddCustomerModel){
        return axiosInstance.post<AddCustomerModel>("customers", newCustomer)
   }
   
}