
import { ShowRentalModel } from "../models/Requests/ShowRental";
import { AddShowRentalResponse } from "../models/Responses/AddShowRentalResponse";
import axiosInstance from "../utils/axiosInterceptors";


export default class ShowRentalService {
   
   add(newRental: ShowRentalModel){
        return axiosInstance.post<AddShowRentalResponse>("rentals/showRental", newRental)
   }
   
}