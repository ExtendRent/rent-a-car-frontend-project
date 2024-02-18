export interface UpdateDiscountCodeModel {
    id: number;
	discountCode :string;
    discountPercentage? : number ;
    active : boolean;
}