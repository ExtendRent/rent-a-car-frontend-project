import { UpdatePaymentDetailsModel } from "../models/Requests/PaymentDetails/UpdatePaymentDetailsModel"
import { GetAllPaymentDetailsModel } from "../models/Responses/PaymentDetails/GetAllPaymentDetailsModel"
import axiosInstance from "../utils/axiosInterceptors"

export default class PaymentDetailsService {
    getAll() {
        return axiosInstance.get<GetAllPaymentDetailsModel>("paymentDetails")
    }

    update(updatedPaymentDetails: UpdatePaymentDetailsModel){
        return axiosInstance.put<GetAllPaymentDetailsModel>("paymentDetails", updatedPaymentDetails)
    }
}