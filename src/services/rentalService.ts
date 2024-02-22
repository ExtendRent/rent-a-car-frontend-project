import { UpdateRentalModel } from './../models/Requests/Rental/UpdateRentalModel';
import { GetAllRentalsModel } from "../models/Responses/Rental/GetAllRentalsModel";
import axiosInstance from "../utils/axiosInterceptors";
import { ReturnRentalModel } from '../models/Requests/Rental/ReturnRentalModel';
import { AddRentalModel } from '../models/Requests/Rental/AddRentalModel';

class RentalService {

    getAll() {
        return axiosInstance.get<GetAllRentalsModel>("rentals")
    }

    getById(id:number){
        return axiosInstance.get<GetAllRentalsModel>(`rentals/${id}`)
     }  

    add(newRental: AddRentalModel){
        return axiosInstance.post<AddRentalModel>("rentals", newRental)
    }

    update(updatedRental: UpdateRentalModel) {
        return axiosInstance.put<GetAllRentalsModel>("rentals", updatedRental)
    }

    returnRental(returnRentalRequest: ReturnRentalModel) {
        return axiosInstance.put<GetAllRentalsModel>("rentals", returnRentalRequest)
    }

    startRental(rentalId: number) {
        return axiosInstance.put<GetAllRentalsModel>(`rentals/startRental/${rentalId}`)
    }

    delete(id: number){
        return axiosInstance.delete<GetAllRentalsModel>(`rentals?id=${id}&isHardDelete=true`)
    }

    getCountByStatus(status: number){
        return axiosInstance.get<GetAllRentalsModel>(`rentals/countByStatus/${status}`)
    }

    getCountIsDeleted(deleted: boolean){
        return axiosInstance.get<GetAllRentalsModel>(`rentals/count/${deleted}`)
    }
    
}
export default new RentalService();