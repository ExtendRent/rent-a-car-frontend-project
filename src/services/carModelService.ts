import { AddCarModelModel } from "../models/Requests/AddCarModelModel";
import { UpdateCarModelModel } from "../models/Requests/UpdateCarModelModel";
import { GetAllCarModelModel } from "../models/Responses/GetAllCarModelModel";
import axiosInstance from "../utils/axiosInterceptors";


export default class CarModelService {
   
   getAll(){
      return axiosInstance.get<GetAllCarModelModel>("carModels?isDeleted=false", )
   }

   add(newCarModel: AddCarModelModel){
        return axiosInstance.post<AddCarModelModel>("carModels", newCarModel)
   }

   update(updateCarModel : UpdateCarModelModel){
      return axiosInstance.put<UpdateCarModelModel>("carModels",updateCarModel)
   }

   delete(id:number){
      return axiosInstance.delete<GetAllCarModelModel>(`carModels?id=${id}&isHardDelete=true`)
   }
   
   getByBrandId(brandId:number){
      return axiosInstance.get<GetAllCarModelModel>(`carModels/brands/${brandId}`)
   }   
}