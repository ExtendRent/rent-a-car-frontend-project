
import { AddRentalModel } from "../models/Requests/Rental/AddRentalModel";
import { ShowRentalModel } from "../models/Requests/Rental/ShowRental";
import { AddShowRentalResponse } from "../models/Responses/Rental/AddShowRentalResponse";
import axiosInstance from "../utils/axiosInterceptors";


export default class ShowRentalService {
   
   add(newRental: ShowRentalModel){
        return axiosInstance.post<AddShowRentalResponse>("rentals/showRental", newRental)
   }

   addRental(newRental: AddRentalModel){
      return axiosInstance.post<AddRentalModel>("rentals", newRental)
   }
   
}