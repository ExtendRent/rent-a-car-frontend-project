import { AddShiftTypeModel } from "../models/Requests/ShiftType/AddShiftTypeModel";
import { UpdateShiftTypeModel } from "../models/Requests/ShiftType/UpdateShiftTypeModel";
import { GetAllShiftTypesModel } from "../models/Responses/ShiftTypes/GetAllShiftTypesModel";
import axiosInstance from "../utils/axiosInterceptors";


class ShiftTypeService {

    getAll() {
        return axiosInstance.get<GetAllShiftTypesModel>("gearshifts")
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

  getById(id:number){
    return axiosInstance.get<GetAllShiftTypesModel>(`gearshifts/${id}`)
 }  
}
export default new ShiftTypeService();