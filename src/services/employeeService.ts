import { AddEmployeeModel } from "../models/Requests/AddEmployeeModel";
import { UpdateEmployeeModel } from "../models/Requests/UpdateEmployeeModel";
import { GetAllEmployeesModel } from "../models/Responses/GetAllEmployeesModel";
import axiosInstance from "../utils/axiosInterceptors";

export default class EmployeeService{

    getAll(){
        return axiosInstance.get<GetAllEmployeesModel>("employees/")
    }

    add(newEmployee: AddEmployeeModel){
        return axiosInstance.post<AddEmployeeModel>("employees", newEmployee)
   }

   update(updatedEmployee: UpdateEmployeeModel) {
    return axiosInstance.put<GetAllEmployeesModel>("employees",updatedEmployee);
  }

  delete(id: number){
    return axiosInstance.delete<GetAllEmployeesModel>(`employees?id=${id}&isHardDelete=true`)
    
  }    
}