import { AddCustomerModel } from "../models/Requests/Customer/AddCustomerModel";
import { UpdateCustomerModel } from "../models/Requests/Customer/UpdateCustomerModel";
import { GetAllCustomerModel } from "../models/Responses/Customer/GetAllCustomerModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CustomerService{

   getAll(){
       return axiosInstance.get<GetAllCustomerModel>("customers")
   }

   add(newCustomer: AddCustomerModel){
       return axiosInstance.post<AddCustomerModel>("customers", newCustomer)
   }

   update(updatedCustomer: UpdateCustomerModel){
       return axiosInstance.put<GetAllCustomerModel>("customers", updatedCustomer)
   }

   delete(id:number){
       return axiosInstance.delete<GetAllCustomerModel>(`customers?id=${id}&isHardDelete=true`)
   }
}