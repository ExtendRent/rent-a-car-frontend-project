import { AddFuelTypeModel } from "../models/Requests/AddFuelTypeModel";
import { UpdateFuelTypeModel } from "../models/Requests/UpdateFuelTypeModel";
import { GetAllFuelTypesModel } from "../models/Responses/GetAllFuelTypesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class FuelTypeService{

    getAll(){
        return axiosInstance.get<GetAllFuelTypesModel>("fuels?isDeleted=false")
    }

    add(newFuelType: AddFuelTypeModel){
        return axiosInstance.post<AddFuelTypeModel>("fuels", newFuelType)
    }

    update(updatedFuelType: UpdateFuelTypeModel){
        return axiosInstance.put<GetAllFuelTypesModel>("fuels", updatedFuelType)
    }

    delete(id: number){
        return axiosInstance.delete<GetAllFuelTypesModel>(`fuels?id=${id}&isHardDelete=true`)
    }
}