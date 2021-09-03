import { convertToCurrency } from 'utils/converters';
import { sum } from 'utils/math';
import { CurrencyRates } from './API/currenciesApi';
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

export function stockTotalShares(stock: Stock): number {
	return sum(...stock.lots.map((x) => x.shares));
}
export function stockAvgPrice(stock: Stock): number {
	const totalShares = stockTotalShares(stock);
	return sum(...stock.lots.map((x) => x.shares * x.price)) / totalShares;
}

export function stockGain(
	stock: Stock,
	preferredCurrency?: string,
	currencyRates?: CurrencyRates
): number {
	const totalShares = stockTotalShares(stock);
	const avgPrice = stockAvgPrice(stock);

	return convertToCurrency(
		totalShares * stock.regularMarketPrice - totalShares * avgPrice,
		stock.currency,
		preferredCurrency,
		currencyRates?.usd
	);
}
