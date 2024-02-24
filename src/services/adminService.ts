import { AddAdminModel } from "../models/Requests/Admin/AddAdminModel";
import { UpdateAdminModel } from "../models/Requests/Admin/UpdateAdminModel";
import { GetAllAdminModel } from "../models/Responses/Admin/GetAllAdminModel";
import axiosInstance from "../utils/axiosInterceptors";

class AdminService{

    getAll(){
        return axiosInstance.get<GetAllAdminModel>("admins")
    }

    getById(id: number){
        return axiosInstance.get<GetAllAdminModel>(`admins/${id}`)
    }

    getAdminCountIsDeleted(deleted: boolean){
        return axiosInstance.get<{response: number}>(`admins/count/${deleted}`)
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
export default new AdminService();