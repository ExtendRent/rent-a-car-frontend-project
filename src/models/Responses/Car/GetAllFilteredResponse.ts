export interface GetAllFilteredResponse {
	brandId?: number;
	modelId?: number;
	colorId?:number;
	fuelTypeId?:number;
	shiftTypeId?:number;
	startDate?:Date | string;
	endDate?:Date | string;
}