export interface RentalModel {
  response: {
    id: number;
    customerEntityId: number;
    discountEntityId: number;
    rentalStatusEntityId: number;
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
    returnDate: Date | string;

    paymentDetailsEntityAmount: number;
    paymentDetailsEntityPaymentTypeEntityPaymentTypeName: string;
    rentalStatusEntityName: string;
    discountEntityDiscountCode: string;
    active: boolean;
    deleted: boolean;
  };
}
