
import { AllGetByDateCarResponse } from "../models/Responses/AllGetByDateCarResponse";
import { GetAllFilteredResponse } from "../models/Responses/Car/GetAllFilteredResponse";

import { AddCarModel } from "../models/Requests/AddCarModel";
import { UpdateCarModel } from "../models/Requests/UpdateCarModel";

import { GetAllCarsModel } from "../models/Responses/GetAllCarsModel";
import { GetByDateCarModel } from "../models/Responses/GetByDateCarModel";
import { GetByDateCarResponse } from "../models/Responses/GetByDateCarResponse";
import axiosInstance from "../utils/axiosInterceptors";

export default class CarService {

   
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