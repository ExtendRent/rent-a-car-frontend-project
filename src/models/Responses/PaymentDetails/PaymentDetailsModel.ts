export interface PaymentDetailsModel {
    id: number;
    paymentTypeEntityId: number;
    amount: number;
    paymentTypeEntityName: string;
    createdDate:Date | string ;
    deleted: boolean;
}