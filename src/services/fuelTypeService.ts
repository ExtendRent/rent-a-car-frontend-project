import { AddFuelTypeModel } from "../models/Requests/FuelType/AddFuelTypeModel";
import { UpdateFuelTypeModel } from "../models/Requests/FuelType/UpdateFuelTypeModel";
import { GetAllFuelTypesModel } from "../models/Responses/FuelType/GetAllFuelTypesModel";
import axiosInstance from "../utils/axiosInterceptors";

class FuelTypeService{

    getAll(){
        return axiosInstance.get<GetAllFuelTypesModel>("fuels")
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

    getById(id:number){
        return axiosInstance.get<GetAllFuelTypesModel>(`fuels/${id}`)
     }  
}
export default new FuelTypeService();