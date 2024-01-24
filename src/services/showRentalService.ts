
import { ShowRentalModel } from "../models/Requests/ShowRental";
import axiosInstance from "../utils/axiosInterceptors";


export default class ShowRentalService {
   
   add(newRental: ShowRentalModel){
        return axiosInstance.post<ShowRentalModel>("rentals/showRental", newRental)
   }
   
}