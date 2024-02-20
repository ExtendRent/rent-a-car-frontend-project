import { GetAllRentalStatusModel } from "../models/Responses/RentalStatus/GetAllRentalStatusModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class RentalStatusService{

    getAll(){
        return axiosInstance.get<GetAllRentalStatusModel>("rentalStatuses");
    }

}