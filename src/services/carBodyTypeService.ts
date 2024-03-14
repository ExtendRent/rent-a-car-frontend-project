import { AddCarBodyTypeModel } from "../models/Requests/CarBodyType/AddCarBodyTypeModel";
import { UpdateCarBodyTypeModel } from "../models/Requests/CarBodyType/UpdateCarBodyTypeModel";
import { GetAllCarBodyTypeModel } from "../models/Responses/CarBodyType/GetAllCarBodyTypeModel";
import axiosInstance from "../utils/axiosInterceptors";

class CarBodyTypeService{

    getAll() {
        return axiosInstance.get<GetAllCarBodyTypeModel>("carBodyTypes")
    }

    getById(id: number){
        return axiosInstance.get<GetAllCarBodyTypeModel>(`carBodyTypes/${id}`)
    }

    add(newCarBodyType: AddCarBodyTypeModel){
        return axiosInstance.post<AddCarBodyTypeModel>("carBodyTypes", newCarBodyType)
    }

    update(updatedCarBodyType: UpdateCarBodyTypeModel) {
        return axiosInstance.put<GetAllCarBodyTypeModel>("carBodyTypes",updatedCarBodyType);
    }

    delete(id:number){
        return axiosInstance.delete<GetAllCarBodyTypeModel>(`carBodyTypes?id=${id}&isHardDelete=true`)
    }
    
}
export default new CarBodyTypeService();