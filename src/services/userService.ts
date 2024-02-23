import { PageModel } from "../models/Responses/Pageable/pageModel";
import { GetAllUsersModel } from "../models/Responses/User/GetAllUsersModel";
import axiosInstance from "../utils/axiosInterceptors";

class UserService{

    getAll(page: PageModel){
        return axiosInstance.get<GetAllUsersModel>(`users?page=${page.page}&size=${page.size}&sort=${page.sort}`);
    }

    updateUserBlock(id: number){
        return axiosInstance.put<GetAllUsersModel>(`users/block/${id}`)
    }

    getById(id: number) {
        return axiosInstance.get<GetAllUsersModel>(`users/${id}`)
    }

    getUserCountIsDeleted(deleted: boolean) {
        return axiosInstance.get<{response: number}>(`users/count/${deleted}`);
    }
    updatePassword(param:{id: number,password:string}){
        return axiosInstance.put(`users/updatePassword?id=${param.id}&password=${param.password}`);
    }

}
export default new UserService();