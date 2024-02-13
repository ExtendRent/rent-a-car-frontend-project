export interface ShowRentalModel {
	discountCode: string | null;
    customerEntityId:number;
    carEntityId:number;
    startDate: Date | string;  // startDate hem Date hem de string olabilir
    endDate: Date | string;    // endDate hem Date hem de string olabilir
  }