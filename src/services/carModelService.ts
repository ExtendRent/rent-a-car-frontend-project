import { AddCarModelModel } from "../models/Requests/CarModel/AddCarModelModel";
import { UpdateCarModelModel } from "../models/Requests/CarModel/UpdateCarModelModel";
import { GetAllCarModelModel } from "../models/Responses/CarModel/GetAllCarModelModel";
import axiosInstance from "../utils/axiosInterceptors";


class CarModelService {
   
   getAll(){
      return axiosInstance.get<GetAllCarModelModel>("carModels", )
   }

   getById(id: number){
      return axiosInstance.get<GetAllCarModelModel>(`carModels/${id}`)
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
export default new CarModelService();