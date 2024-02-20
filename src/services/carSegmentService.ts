import { AddCarSegmentModel } from "../models/Requests/CarSegment/AddCarSegmentModel";
import { UpdateCarSegmentModel } from "../models/Requests/CarSegment/UpdateCarSegmentModel";
import { GetAllCarSegmentsModel } from "../models/Responses/CarSegment/GetAllCarSegmentsModel";
import axiosInstance from "../utils/axiosInterceptors";

class CarSegmentService {

  getAll() {
    return axiosInstance.get<GetAllCarSegmentsModel>("car-segments")
  }

  getById(id: number) {
    return axiosInstance.get<GetAllCarSegmentsModel>(`car-segments/${id}`)
  }

  add(newCarSegment: AddCarSegmentModel) {
    return axiosInstance.post<AddCarSegmentModel>("car-segments", newCarSegment)
  }

  update(updatedCarSegment: UpdateCarSegmentModel) {
    return axiosInstance.put<GetAllCarSegmentsModel>("car-segments", updatedCarSegment);
  }

  delete(id: number) {
    return axiosInstance.delete<GetAllCarSegmentsModel>(`car-segments?id=${id}&isHardDelete=true`)
  }
}

export default new CarSegmentService();