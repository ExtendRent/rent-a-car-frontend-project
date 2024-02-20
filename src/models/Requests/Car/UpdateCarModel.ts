export interface UpdateCarModel {
    id?: number;
    brandEntityId : number;
    carModelEntityId: number;
    carBodyTypeEntityId: number;
    colorEntityId: number;
    vehicleStatusEntityId: number;
    year: number;
    details: string;
    rentalPrice: number;
    licensePlate: string;
    kilometer: number;
    expectedMinDrivingLicenseTypeId: number;
    shiftTypeEntityId: number;
    fuelTypeEntityId: number;
    seat: number;
    luggage: number;
    isAvailable: boolean;
    vehicleType:string;
    carImageEntityId:number;
    carSegmentEntityId:number;

}