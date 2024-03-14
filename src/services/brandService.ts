import axiosInstance from "../utils/axiosInterceptors";
import { AddBrandModel } from "../models/Requests/Brand/AddBrandModel";
import { GetAllBrandsModel } from "../models/Responses/Brand/GetAllBrandsModel";
import { UpdateBrandModel } from "../models/Requests/Brand/UpdateBrandModel";

class BrandService {
  getAll() {
    return axiosInstance.get<GetAllBrandsModel>("brands")
  }

  getById(id: number){
    return axiosInstance.get<GetAllBrandsModel>(`brands/${id}`)
  }

  add(newBrand: AddBrandModel) {
    return axiosInstance.post<AddBrandModel>("brands", newBrand)
  }

  update(updatedBrand: UpdateBrandModel) {
    return axiosInstance.put<GetAllBrandsModel>("brands", updatedBrand);
  }
  
  delete(id: number) {
    return axiosInstance.delete<GetAllBrandsModel>(`brands?id=${id}&isHardDelete=true`)
  }
  
}
export default new BrandService();