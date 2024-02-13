import { UpdatePaymentTypeModel } from "../models/Requests/PaymentType/UpdatePaymentTypeModel";
import { GetAllPaymentTypesModel } from "../models/Responses/PaymentType/GetAllPaymentTypesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class PaymentTypeService {
    getAll() {
        return axiosInstance.get<GetAllPaymentTypesModel>("paymentTypes")
    }

    update(updatedPaymentType: UpdatePaymentTypeModel){
        return axiosInstance.put<GetAllPaymentTypesModel>("paymentTypes", updatedPaymentType)
    }
}