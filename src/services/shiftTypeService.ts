import { AddShiftTypeModel } from "../models/Requests/AddShiftTypeModel";
import { UpdateShiftTypeModel } from "../models/Requests/UpdateShiftTypeModel";
import { GetAllShiftTypesModel } from "../models/Responses/GetAllShiftTypesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class ShiftTypeService {

    getAll() {
        return axiosInstance.get<GetAllShiftTypesModel>("gearshifts?isDeleted=false")
    }

    add(newShiftType: AddShiftTypeModel){
        return axiosInstance.post<AddShiftTypeModel>("gearshifts", newShiftType)
   }

   update(updatedShiftType: UpdateShiftTypeModel) {
    return axiosInstance.put<GetAllShiftTypesModel>("gearshifts",updatedShiftType);
  }

  delete(id: number){
    return axiosInstance.delete<GetAllShiftTypesModel>(`gearshifts?id=${id}&isHardDelete=true`)
    
  }
}