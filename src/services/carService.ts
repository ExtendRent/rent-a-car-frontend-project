import { AddCarModel } from "../models/Requests/AddCarModel";
import { GetAllCarsModel } from "../models/Responses/GetAllCarsModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CarService {
    getAll() {
        return axiosInstance.get<GetAllCarsModel>("cars?isDeleted=false")
    }

    add(newCar: AddCarModel){
        return axiosInstance.post<AddCarModel>("cars", newCar)
   }


   
}