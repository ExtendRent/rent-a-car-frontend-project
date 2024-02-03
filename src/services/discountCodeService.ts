import { AddDiscountCodeModel } from "../models/Requests/AddDiscountCodeModel";
import { UpdateDiscountCodeModel } from "../models/Requests/UpdateDiscountCodeModel";
import { GetAllDiscountCodesModel } from "../models/Responses/GetAllDiscountCodesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class DiscountCodeService{

    getAll() {
        return axiosInstance.get<GetAllDiscountCodesModel>("discounts?isDeleted=false")
    }

    add(newDiscountCode: AddDiscountCodeModel){
        return axiosInstance.post<AddDiscountCodeModel>("discounts", newDiscountCode)
   }

   update(updatedDiscountCode: UpdateDiscountCodeModel) {
    return axiosInstance.put<GetAllDiscountCodesModel>("discounts",updatedDiscountCode);
  }

  delete(id: number){
    return axiosInstance.delete<GetAllDiscountCodesModel>(`discounts?id=${id}&isHardDelete=true`)
    
  }     
}