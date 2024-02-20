import { UpdatePaymentDetailsModel } from "../models/Requests/PaymentDetails/UpdatePaymentDetailsModel"
import { GetAllPaymentDetailsModel } from "../models/Responses/PaymentDetails/GetAllPaymentDetailsModel"
import axiosInstance from "../utils/axiosInterceptors"

class PaymentDetailsService {

    getAll() {
        return axiosInstance.get<GetAllPaymentDetailsModel>("paymentDetails")
    }

    update(updatedPaymentDetails: UpdatePaymentDetailsModel){
        return axiosInstance.put<GetAllPaymentDetailsModel>("paymentDetails", updatedPaymentDetails)
    }

    getById(id: number){
        return axiosInstance.get<GetAllPaymentDetailsModel>(`paymentDetails/${id}`)
    }

    getYearlyIncome(year: number){
        return axiosInstance.get<GetAllPaymentDetailsModel>(`paymentDetails/yearlyIncome?year=${year}`)
    }

    getTotalIncome(){
        return axiosInstance.get<GetAllPaymentDetailsModel>("paymentDetails/totalIncome")
    }

    getMonthlyIncome(startDate: Date | string, endDate: Date | string){
        return axiosInstance.get<GetAllPaymentDetailsModel>(`paymentDetails/monthlyIncome?startDate=${startDate}&endDate=${endDate}`)
    }

    getFilter(filters: { minAmount?: number, maxAmount?: number, minDate?: Date, maxDate?: Date, isDeleted?: boolean }) {
        return axiosInstance.get<GetAllPaymentDetailsModel>("paymentDetails/filter?", { params: filters });
    }
    

}
export default new PaymentDetailsService