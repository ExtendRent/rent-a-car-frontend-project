import axiosInstance from "../utils/axiosInterceptors";

export default class ImageService {
  addCarImage(image: FormData, licensePlate: string) {
    return axiosInstance.post(`images/car?licensePlate=${licensePlate}`, image);
  }

  addUserImage(image: FormData, emailAddress: string) {
    return axiosInstance.post<{}>(
      `images/user?emailAddress=${emailAddress}`,
      image
    );
  }
  addBrandImage(image: FormData, licensePlate: string) {
    return axiosInstance.post<{}>(
      `images/brand?licensePlate=${licensePlate}`,
      image
    );
  }
}
