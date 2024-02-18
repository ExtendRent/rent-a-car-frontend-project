export interface UpdateCustomerModel{
    id: number,
    drivingLicenseTypeEntityId: number,
    name: string,
    surname: string,
    emailAddress: string,
    password: string,
    phoneNumber: string,
    drivingLicenseNumber: string;
    imagePath: string,
    status: string,
    userImageEntityId: number,
}