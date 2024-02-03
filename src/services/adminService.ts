import { AddAdminModel } from "../models/Requests/AddAdminModel";
import { UpdateAdminModel } from "../models/Requests/UpdateAdminModel";
import { GetAllAdminModel } from "../models/Responses/GetAllAdminModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class AdminService{

    getAll(){
        return axiosInstance.get<GetAllAdminModel>("admins?isDeleted=false")
    }

    add(newAdmin: AddAdminModel){
        return axiosInstance.post<AddAdminModel>("admins", newAdmin)
    }

    update(updatedAdmin: UpdateAdminModel){
        return axiosInstance.put<GetAllAdminModel>("admins", updatedAdmin)
    }

    delete(id:number){
        return axiosInstance.delete<GetAllAdminModel>(`admins?id=${id}&isHardDelete=true`)
    }
}