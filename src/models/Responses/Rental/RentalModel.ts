export interface RentalModel{
    id: number;
    customerEntityId: number;
    discountEntityId: number;
    customerEntityName: string;
    customerEntitySurname: string;

    CarEntityId: number;
    carEntityBrandEntityName: string;
    carEntityModelEntityName: string;
    carEntityColorEntityName: string;
    carBodyTypeEntityName: string;
    carEntityYear: number;
    carEntityRentalPrice: number;
    carEntityLicensePlate: string;

    startDate: Date | string;
    endDate: Date | string;

    paymentDetailsEntityAmount: number;
    paymentDetailsEntityPaymentTypeEntityPaymentTypeName: string;
    isActive: boolean;
}