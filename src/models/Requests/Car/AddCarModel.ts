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
    expectedMinDrivingLicenseTypeId: number;
    shiftTypeEntityId: number;
    fuelTypeEntityId: number;
    seat: number;
    luggage: number;
}