export type StockList = { [key: string]: Stock };

export interface Stock {
	currentValue: number;
	lots: StockLot[];
}

export interface StockLot {
	date: Date;
	shares: number;
	price: number;
}
