import { AddDrivingLicenseTypeModel } from '../models/Requests/AddDrivingLicenseTypeModel';
import { UpdateDrivingLicenseTypeModel } from '../models/Requests/UpdateDrivingLicenseTypeModel';
import { GetAllDrivingLicenseTypesModel } from '../models/Responses/Car/GetAllDrivingLicenseTypesModel';
import axiosInstance from '../utils/axiosInterceptors';
import { DrivingLicenseTypeModel } from './../models/Responses/DrivingLicenseTypeModel';
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