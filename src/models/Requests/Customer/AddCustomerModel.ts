export interface AddCustomerModel {
	name: string;
    surname: string;
    emailAddress: string;
    password: string;
    phoneNumber: string;
    drivingLicenseNumber: string;
    drivingLicenseTypeEntityId: number | undefined;
    userImageEntityId?: number ;
}