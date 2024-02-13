export interface GetByDateCarResponse {

            id: number,
            isLicenseTypeSuitable: boolean,
            carModelEntityBrandEntityName: string,
            carModelEntityName: string,
            colorEntityName: string,
            year: number,
            carBodyTypeEntityName: string,
            fuelTypeEntityName: string,
            shiftTypeEntityName: string,
            seat: number,
            luggage: number,
            details:string,
            rentalPrice: number,
            licensePlate: string,
            kilometer: number,
            imagesEntityImagePaths: string[],
            expectedDrivingLicenseTypes: string[]
            vehicleStatusEntityName: string
       
}
