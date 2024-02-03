export interface AddCarModel {
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
    imagePaths: string[];
    expectedDrivingLicenseTypes: string[];
    shiftTypeEntityId: number;
    fuelTypeEntityId: number;
    seat: number;
    luggage: number;
}