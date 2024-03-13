import { GetAllPaymentTypesModel } from './../models/Responses/PaymentType/GetAllPaymentTypesModel';
import { UpdatePaymentTypeModel } from "../models/Requests/PaymentType/UpdatePaymentTypeModel";
import axiosInstance from "../utils/axiosInterceptors";

 class PaymentTypeService {
    getAll() {
        return axiosInstance.get<GetAllPaymentTypesModel>("paymentTypes")
    }

    update(updatedPaymentType: UpdatePaymentTypeModel){
        return axiosInstance.put<GetAllPaymentTypesModel>("paymentTypes", updatedPaymentType)
    }

    getById(id: number){
        return axiosInstance.get<GetAllPaymentTypesModel>(`paymentTypes/${id}`)
    }
}
export default new PaymentTypeService();