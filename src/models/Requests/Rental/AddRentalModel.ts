export interface AddRentalModel{
    customerEntityId: number;
    carEntityId: number;
    startDate: Date | string;
    endDate: Date | string;
    paymentTypeId: number;
    amount: number;
    discountCode?: string;
    creditCardInformation: {
        cardNumber: string;
        cardOwnerName: string;
        cardOwnerSurname: string;
        expirationDate: Date;
        cvc: string;
      };
}