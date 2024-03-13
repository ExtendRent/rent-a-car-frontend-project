import axiosInstance from "../utils/axiosInterceptors";
import qs from 'qs';
export interface  EmailImageRequest{
    emailAddress: string;
    image: string;
  }
export interface  LicanseImageRequest{
    licensePlate : string;
    image: string;
}

export default class ImageService{
    addCarImage(image: FormData ,licensePlate:string){
        
        return axiosInstance.post(`images/car?licensePlate=${licensePlate}`, image);
    }
    
    addUserImage(addUserImage: EmailImageRequest){
        return axiosInstance.post<{}>("images/user", addUserImage)
    }
    addBrandImage(newBrandType: LicanseImageRequest){
        return axiosInstance.post<{}>("images/brand", newBrandType)
    }
}
