import { QuoteResponse } from './API/yahoo';

export type StockList = Stock[];

export interface Stock extends QuoteResponse {
	lots: StockLot[];
}

export interface StockLot {
	id: string;
	date: Date;
	shares: number;
	price: number;
}
