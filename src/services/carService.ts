import { AllGetByDateCarResponse } from "../models/Responses/AllGetByDateCarResponse";
import { GetAllFilteredResponse } from "../models/Responses/Car/GetAllFilteredResponse";
import { GetAllCarsModel } from "../models/Responses/GetAllCarsModel";
import { GetByDateCarModel } from "../models/Responses/GetByDateCarModel";
import { GetByDateCarResponse } from "../models/Responses/GetByDateCarResponse";
import axiosInstance from "../utils/axiosInterceptors";

export default class CarService {
    getAll() {
        return axiosInstance.get<GetAllCarsModel>("cars")
    }
    getByDate(searchByDate : GetByDateCarModel){
        return axiosInstance.get<AllGetByDateCarResponse>("cars",{params: searchByDate})
    }
    getByAllFiltered(allFiltred : GetAllFilteredResponse){
        return axiosInstance.get<AllGetByDateCarResponse>("cars/filtered",{params: allFiltred})
    } 
}