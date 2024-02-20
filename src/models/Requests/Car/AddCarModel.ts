export interface AddCarModel {
	vehicleType:string;
    carImageEntityId:number;
    brandEntityId : number;
    carModelEntityId: number;
    carBodyTypeEntityId: number;
    colorEntityId: number;
    carSegmentEntityId:number;
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
    available:boolean;
}