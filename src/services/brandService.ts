import axios from "axios";
import axiosInstance from "../utils/axiosInterceptors";
import { AddBrandModel } from "../models/Requests/AddBrandModel";
import { GetAllBrandsModel } from "../models/Responses/GetAllBrandsModel";
import { UpdateBrandModel } from "../models/Requests/UpdateBrandModel";

export default class BrandService {
    getAll() {
        return axiosInstance.get<GetAllBrandsModel>("brands?isDeleted=false")
    }
   add(newBrand: AddBrandModel){
        return axiosInstance.post<AddBrandModel>("brands", newBrand)
   }
   
   update(updatedBrand: UpdateBrandModel) {
    return axiosInstance.put<GetAllBrandsModel>("brands",updatedBrand);
  }
  delete(id: number){
    return axiosInstance.delete<GetAllBrandsModel>(`brands/{id}?id=${id}&isHardDelete=true`)
    
  }
}