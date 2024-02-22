import { getByCarId } from './../store/slices/carSlice';
import { UpdateVehicleStatusModel } from "../models/Requests/VehicleStatus/UpdateVehicleStatusModel";
import { GetAllVehicleStatusesModel } from "../models/Responses/VehicleStatus/GetAllVehicleStatusesModel";
import axiosInstance from "../utils/axiosInterceptors";

class VehicleStatusService{

    getAll(){
        return axiosInstance.get<GetAllVehicleStatusesModel>("vehicle-statuses");
    }

    update(updatedVehicleStatus: UpdateVehicleStatusModel){
        return axiosInstance.put<GetAllVehicleStatusesModel>("vehicle-statuses", updatedVehicleStatus)
    }

    getById(id: number) {
        return axiosInstance.get<GetAllVehicleStatusesModel>(`vehicle-statuses/${id}`)
    }


}
export default new VehicleStatusService();