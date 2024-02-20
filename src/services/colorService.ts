import { AddColorModel } from "../models/Requests/Color/AddColorModel";
import { UpdateColorModel } from "../models/Requests/Color/UpdateColorModel";
import { GetAllColorsModel } from "../models/Responses/Color/GetAllColorsModel";
import axiosInstance from "../utils/axiosInterceptors";


class ColorService{
    getAll() {
        return axiosInstance.get<GetAllColorsModel>("colors")
    }
    
    add(newColor: AddColorModel){
        return axiosInstance.post<AddColorModel>("colors", newColor)
   }


    getById(id: number){
      return axiosInstance.get<GetAllColorsModel>(`colors/${id}`)
    }

 

  update(updatedColor: UpdateColorModel) {
    return axiosInstance.put<GetAllColorsModel>("colors", updatedColor);
  }

  delete(id: number) {
    return axiosInstance.delete<GetAllColorsModel>(`colors?id=${id}&isHardDelete=true`)

  }      
}
export default new ColorService();

