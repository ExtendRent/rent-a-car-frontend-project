import { GetAllCarsModel } from "../models/Responses/GetAllCarsModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class CarService {
    getAll() {
        return axiosInstance.get<GetAllCarsModel>("cars")
    }
   
}