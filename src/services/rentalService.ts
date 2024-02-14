import { GetAllRentalsModel } from "../models/Responses/Rental/GetAllRentalsModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class RentalService {
    getAll() {
        return axiosInstance.get<GetAllRentalsModel>("rentals")
    }
}