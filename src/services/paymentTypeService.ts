import { UpdatePaymentTypeModel } from "../models/Requests/UpdatePaymentTypeModel";
import { GetAllPaymentTypesModel } from "../models/Responses/GetAllPaymentTypesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class PaymentTypeService {
    getAll() {
        return axiosInstance.get<GetAllPaymentTypesModel>("paymentTypes")
    }

    update(updatedPaymentType: UpdatePaymentTypeModel){
        return axiosInstance.put<GetAllPaymentTypesModel>("paymentTypes", updatedPaymentType)
    }
}