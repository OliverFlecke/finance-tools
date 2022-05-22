import { convertToCurrency } from 'utils/converters';
import { sum } from 'utils/math';
import { CurrencyRates } from 'features/Currency/api';
import { QuoteResponse } from './API/yahoo';

export type StockList = Stock[];

export interface Stock extends QuoteResponse {
	lots: StockLot[];
}

export interface StockLot {
	id: string;
	shares: number;
	buyDate: Date;
	buyPrice: number;
	buyBrokerage: number;
	soldDate?: Date;
	soldPrice?: number;
	soldBrokerage?: number;
}

export function stockTotalShares(stock: Stock): number {
	return sum(...stock.lots.map(x => x.shares));
}
export function stockAvgPrice(stock: Stock): number {
	const totalShares = stockTotalShares(stock);
	return sum(...stock.lots.map(x => x.shares * x.buyPrice)) / totalShares;
}

export function stockGain(
	stock: Stock,
	currencyRates: CurrencyRates,
	preferredCurrency?: string
): number {
	const totalShares = stockTotalShares(stock);
	const avgPrice = stockAvgPrice(stock);

	return convertToCurrency(
		totalShares * stock.regularMarketPrice - totalShares * avgPrice,
		currencyRates?.usd,
		stock.currency,
		preferredCurrency
	);
}
