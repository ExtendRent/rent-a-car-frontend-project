import { AddCarBodyTypeModel } from "../models/Requests/AddCarBodyTypeModel";
import { UpdateCarBodyTypeModel } from "../models/Requests/UpdateCarBodyTypeModel";
import { GetAllCarBodyTypeModel } from "../models/Responses/GetAllCarBodyTypeModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CarBodyTypeService{

    getAll() {
        return axiosInstance.get<GetAllCarBodyTypeModel>("carBodyTypes?isDeleted=false")
    }

    add(newCarBodyType: AddCarBodyTypeModel){
        return axiosInstance.post<AddCarBodyTypeModel>("carBodyTypes", newCarBodyType)
    }

    update(updatedCarBodyType: UpdateCarBodyTypeModel) {
        return axiosInstance.put<GetAllCarBodyTypeModel>("carBodyTypes",updatedCarBodyType);
    }

    delete(id:number){
        return axiosInstance.delete<GetAllCarBodyTypeModel>(`carBodyTypes/{id}?id=${id}&isHardDelete=true`)
    }
    
}