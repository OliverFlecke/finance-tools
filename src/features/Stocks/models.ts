export type StockList = Stock[];

export interface Stock {
	symbol: string;
	currentValue: number;
	lots: StockLot[];
}

export interface StockLot {
	id: string;
	date: Date;
	shares: number;
	price: number;
}
