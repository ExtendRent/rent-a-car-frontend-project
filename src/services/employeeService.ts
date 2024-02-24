import { AddEmployeeModel } from "../models/Requests/Employee/AddEmployeeModel";
import { UpdateEmployeeModel } from "../models/Requests/Employee/UpdateEmployeeModel";
import { GetAllEmployeesModel } from "../models/Responses/Employee/GetAllEmployeesModel";
import axiosInstance from "../utils/axiosInterceptors";

class EmployeeService {

  getAll() {
    return axiosInstance.get<GetAllEmployeesModel>("employees")
  }

  add(newEmployee: AddEmployeeModel) {
    return axiosInstance.post<AddEmployeeModel>("employees", newEmployee)
  }

  update(updatedEmployee: UpdateEmployeeModel) {
    return axiosInstance.put<GetAllEmployeesModel>("employees", updatedEmployee);
  }

  delete(id: number) {
    return axiosInstance.delete<GetAllEmployeesModel>(`employees?id=${id}&isHardDelete=true`)
  }

  getById(id:number){
    return axiosInstance.get<GetAllEmployeesModel>(`employees/${id}`)
 }  

 getEmployeeCountIsDeleted(deleted: boolean){
  return axiosInstance.get<{response: number}>(`employees/count/${deleted}`)
}
}
export default new EmployeeService();