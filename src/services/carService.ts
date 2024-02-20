
import { AllGetByDateCarResponse } from "../models/Responses/Car/AllGetByDateCarResponse";
import { GetAllFilteredResponse } from "../models/Responses/Car/GetAllFilteredResponse";

import { AddCarModel } from "../models/Requests/Car/AddCarModel";
import { UpdateCarModel } from "../models/Requests/Car/UpdateCarModel";

import { GetAllCarsModel } from "../models/Responses/Car/GetAllCarsModel";
import { GetByDateCarModel } from "../models/Responses/Car/GetByDateCarModel";
import { GetByDateCarResponse } from "../models/Responses/Car/GetByDateCarResponse";
import axiosInstance from "../utils/axiosInterceptors";
import { CarModel } from "../models/Responses/Car/CarModel";

class CarService {

   
    getByDate(searchByDate : GetByDateCarModel){
        return axiosInstance.get<AllGetByDateCarResponse>("cars",{params: searchByDate})
    }
    getByAllFiltered(allFiltred : GetAllFilteredResponse){
        return axiosInstance.get<AllGetByDateCarResponse>("cars/filtered",{params: allFiltred})
    } 

    getAll() {
        return axiosInstance.get<GetAllCarsModel>("cars?isDeleted=false")
    }

    getByCarId(id: number){
        return axiosInstance.get<CarModel>(`cars/${id}`)
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
export default new CarService();