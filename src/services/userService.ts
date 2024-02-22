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
        return axiosInstance.get<GetAllUsersModel>(`users/count/${deleted}`);
    }

}
export default new UserService();