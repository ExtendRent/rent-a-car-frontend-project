export interface UpdateRentalModel{
    id: number;
    customerEntityId: number;
    carEntityId: number;
    paymentDetailsEntityId: number;
    startDate: Date | string;
    endDate: Date | string;
    returnDate: Date | string;
    startKilometer: number;
    endKilometer: number;
    discountEntityId: number;
    isActive: boolean;
}