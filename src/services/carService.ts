import { AddCarModel } from "../models/Requests/AddCarModel";
import { UpdateCarModel } from "../models/Requests/UpdateCarModel";
import { GetAllCarsModel } from "../models/Responses/GetAllCarsModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CarService {
  getAll() {
    return axiosInstance.get<GetAllCarsModel>("cars?isDeleted=false")
  }

  getByCarId(id: number){
    return axiosInstance.get<GetAllCarsModel>(`cars/${id}`)
  }

  add(newCar: AddCarModel) {
    return axiosInstance.post<AddCarModel>("cars", newCar)
  }

  update(updatedCar: UpdateCarModel) {
    return axiosInstance.put<GetAllCarsModel>("cars", updatedCar);
  }

  delete(id: number){
    return axiosInstance.delete<GetAllCarsModel>(`cars?id=${id}&isHardDelete=true`)
  } 
}