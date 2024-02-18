import { AddDrivingLicenseTypeModel } from '../models/Requests/DrivingLicenseType/AddDrivingLicenseTypeModel';
import { UpdateDrivingLicenseTypeModel } from '../models/Requests/DrivingLicenseType/UpdateDrivingLicenseTypeModel';
import { GetAllDrivingLicenseTypesModel } from '../models/Responses/DrivingLicenseType/GetAllDrivingLicenseTypesModel';
import axiosInstance from '../utils/axiosInterceptors';


export default class DrivingLicenseTypeModelService{
    getAll() {
        return axiosInstance.get<GetAllDrivingLicenseTypesModel>("drivingLicenseType")
    }

    add(newDrivingLicenseType: AddDrivingLicenseTypeModel) {
        return axiosInstance.post<AddDrivingLicenseTypeModel>("drivingLicenseType", newDrivingLicenseType);
    }

    update(updatedDrivingLicenseType: UpdateDrivingLicenseTypeModel) {
        return axiosInstance.put<GetAllDrivingLicenseTypesModel>("drivingLicenseType",updatedDrivingLicenseType);
      }

      delete(id: number){
        return axiosInstance.delete<GetAllDrivingLicenseTypesModel>(`drivingLicenseType?id=${id}&isHardDelete=true`)
        
      }    

}