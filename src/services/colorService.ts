import { AddColorModel } from "../models/Requests/AddColorModel";
import { UpdateColorModel } from "../models/Requests/UpdateColorModel";
import { GetAllColorsModel } from "../models/Responses/GetAllColorsModel";
import axiosInstance from "../utils/axiosInterceptors";


export default class ColorService{
    getAll() {
        return axiosInstance.get<GetAllColorsModel>("colors?isDeleted=false")
    }
    add(newColor: AddColorModel){
        return axiosInstance.post<AddColorModel>("colors", newColor)
   }

   update(updatedColor: UpdateColorModel) {
    return axiosInstance.put<GetAllColorsModel>("colors",updatedColor);
  }

   delete(id: number){
    return axiosInstance.delete<GetAllColorsModel>(`colors?id=${id}&isHardDelete=true`)
    
  }      
}