export interface GetAllFilteredResponse {
	brandId?: number;
	modelId?: number;
	colorId?:number;
	customerId?:number;
	fuelTypeId?:number;
	shiftTypeId?:number;
	startDate?:Date | string;
	endDate?:Date | string;
	statusId?: number;
	segmentId?: number;
	licenseSuitable?: boolean;
	startPrice?: number;
	endPrice?: number;
	startYear?: number;
	endYear?: number;
	deleted?: boolean ;
	expectedMinDrivingLicenseTypeName?:string,


}