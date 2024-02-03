export interface AddShowRentalResponse {
  response: {
    customerDTO: {
      id: number;
      phoneNumber: string;
      drivingLicenseNumber: string;
      drivingLicenseTypes: string[];
      name: string;
      surname: string;
      emailAddress: string;
      authorities: string[];
    };
    carDTO: {
      id: number;
      isLicenseTypeSuitable: boolean;
      carModelEntityBrandEntityName: string;
      carModelEntityName: string;
      colorEntityName: string;
      year: number;
      carBodyTypeEntityName: string;
      fuelTypeEntityName: string;
      shiftTypeEntityName: string;
      seat: number;
      luggage: number;
      details: string;
      rentalPrice: number;
      licensePlate: string;
      kilometer: number;
      imagesEntityImagePaths: string[];
      availabilityDate: Date;
      expectedDrivingLicenseTypes: string[];
      vehicleStatusEntityName: string;
    };
    startDate: Date;
    endDate: Date;
    discountCode: string;
    amount: number;
  };
}