import { AddCustomerModel } from "../models/Requests/Customer/AddCustomerModel";
import { UpdateCustomerModel } from "../models/Requests/Customer/UpdateCustomerModel";
import { GetAllCustomerModel } from "../models/Responses/Customer/GetAllCustomerModel";
import axiosInstance from "../utils/axiosInterceptors";

class CustomerService {

    getAll() {
        return axiosInstance.get<GetAllCustomerModel>("customers")
    }

    getById(id: number){
        return axiosInstance.get<GetAllCustomerModel>(`customers/${id}`)
    }

    add(newCustomer: AddCustomerModel) {
        return axiosInstance.post<AddCustomerModel>("customers", newCustomer)
    }

    update(updatedCustomer: UpdateCustomerModel) {
        return axiosInstance.put<GetAllCustomerModel>("customers", updatedCustomer)
    }

    delete(id: number) {
        return axiosInstance.delete<GetAllCustomerModel>(`customers?id=${id}&isHardDelete=true`)
    }

    getRentalsByCustomerId(customerId: number){
        return axiosInstance.get<GetAllCustomerModel>(`customers/rentals/${customerId}`)
    }

    getCountIsDeleted(deleted: boolean){
        return axiosInstance.get<GetAllCustomerModel>(`customers/count/${deleted}`)
    }

    getCountByStatus(status: string){
        return axiosInstance.get<GetAllCustomerModel>(`customers/countByStatus/${status}`)
    } 
    updatePassword(param:{id: number,password:string}){
        return axiosInstance.get<GetAllCustomerModel>("customers/updatePassword",{params: param});
    }
}

export default new CustomerService();