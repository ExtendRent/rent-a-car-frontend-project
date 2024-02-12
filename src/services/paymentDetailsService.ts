import { UpdatePaymentDetailsModel } from "../models/Requests/UpdatePaymentDetailsModel"
import { GetAllPaymentDetailsModel } from "../models/Responses/Car/GetAllPaymentDetailsModel"
import axiosInstance from "../utils/axiosInterceptors"

export default class PaymentDetailsService {
    getAll() {
        return axiosInstance.get<GetAllPaymentDetailsModel>("paymentDetails")
    }

    update(updatedPaymentDetails: UpdatePaymentDetailsModel){
        return axiosInstance.put<GetAllPaymentDetailsModel>("paymentDetails", updatedPaymentDetails)
    }
}