import { UpdateVehicleStatusModel } from "../models/Requests/UpdateVehicleStatusModel";
import { GetAllVehicleStatusesModel } from "../models/Responses/GetAllVehicleStatusesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class VehicleStatusService{

    getAll(){
        return axiosInstance.get<GetAllVehicleStatusesModel>("vehicle-statuses");
    }

    update(updatedVehicleStatus: UpdateVehicleStatusModel){
        return axiosInstance.put<GetAllVehicleStatusesModel>("vehicle-statuses", updatedVehicleStatus)
    }

}