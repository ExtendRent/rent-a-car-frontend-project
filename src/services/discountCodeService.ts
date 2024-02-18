import { AddDiscountCodeModel } from "../models/Requests/DiscountCode/AddDiscountCodeModel";
import { UpdateDiscountCodeModel } from "../models/Requests/DiscountCode/UpdateDiscountCodeModel";
import { GetAllDiscountCodesModel } from "../models/Responses/DiscountCode/GetAllDiscountCodesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class DiscountCodeService{

    getAll() {
        return axiosInstance.get<GetAllDiscountCodesModel>("discounts")
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