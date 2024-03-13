import { UpdateRentalModel } from './../models/Requests/Rental/UpdateRentalModel';
import { GetAllRentalsModel } from "../models/Responses/Rental/GetAllRentalsModel";
import axiosInstance from "../utils/axiosInterceptors";
import { ReturnRentalModel } from '../models/Requests/Rental/ReturnRentalModel';
import { AddRentalModel } from '../models/Requests/Rental/AddRentalModel';
import { RentalModel } from '../models/Responses/Rental/RentalModel';

class RentalService {

    getAll() {
        return axiosInstance.get<GetAllRentalsModel>("rentals")
    }

    getById(id:number){
        return axiosInstance.get<RentalModel>(`rentals/${id}`)
     }  

    add(newRental: AddRentalModel){
        return axiosInstance.post<AddRentalModel>("rentals", newRental)
    }

    update(updatedRental: UpdateRentalModel) {
        return axiosInstance.put<GetAllRentalsModel>("rentals", updatedRental)
    }

    returnRental(returnRentalRequest: ReturnRentalModel) {
        return axiosInstance.put<GetAllRentalsModel>("rentals/returnRental", returnRentalRequest)
    }

    startRental(rentalId: number) {
        return axiosInstance.put<GetAllRentalsModel>(`rentals/startRental/${rentalId}`)
    }

    delete(id: number){
        return axiosInstance.delete<GetAllRentalsModel>(`rentals?id=${id}&isHardDelete=true`)
    }

    getRentalCountByStatus(status: number){
        return axiosInstance.get<{response: number}>(`rentals/countByStatus/${status}`)
    }

    getRentalCountIsDeleted(deleted: boolean){
        return axiosInstance.get<{response: number}>(`rentals/count/${deleted}`)
    }
    
}
export default new RentalService();