import { AddCustomerModel } from "../models/Requests/Customer/AddCustomerModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CustomerService {
   
   add(newCustomer: AddCustomerModel){
        return axiosInstance.post<AddCustomerModel>("customers", newCustomer)
   }
   
}