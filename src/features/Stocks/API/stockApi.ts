import { apiUrlWithPath, useSampleData } from 'features/apiBase';
import { StockList } from '../models';
import stocksForUserSampleData from './sampleData/stocksForUser';

export function getStocksForUser(): Promise<StockList> {
	if (useSampleData) return Promise.resolve(stocksForUserSampleData);

	return fetch(`${apiUrlWithPath}/stock/tracked`, {
		credentials: 'include',
	})
		.then(async res => await res.json())
		.then(stocks =>
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			stocks.map((stock: any) => ({
				...stock,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				lots: stock.lots.map((lot: any) => ({
					...lot,
					buyDate: new Date(Date.parse(lot.buyDate)),
					soldDate: lot.soldDate
						? new Date(Date.parse(lot.soldDate))
						: undefined,
				})),
			}))
		);
}

export async function trackStock(symbol: string): Promise<void> {
	await fetch(`${apiUrlWithPath}/stock/tracked`, {
		method: 'POST',
		credentials: 'include',
		body: symbol,
	})
		.then(() => console.log(`Stock tracked: ${symbol}`))
		.catch(err => console.log(err));
}

export function addStockLot(lot: AddStockLotRequest): Promise<string> {
	return fetch(`${apiUrlWithPath}/stock/lot`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(lot),
	}).then(res => res.json());
}

export async function updateStockLot(
	id: string,
	lot: UpdateStockLotRequest
): Promise<void> {
	await fetch(`${apiUrlWithPath}/stock/lot/${id}`, {
		method: 'PUT',
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(lot),
	});
}

export async function deleteStockLot(id: string): Promise<void> {
	await fetch(`${apiUrlWithPath}/stock/lot/${id}`, {
		method: 'DELETE',
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

interface AddStockLotRequest extends UpdateStockLotRequest {
	symbol: string;
}

interface UpdateStockLotRequest {
	shares: number;
	buyDate: Date;
	buyPrice: number;
	buyBrokerage: number;
	soldDate?: Date;
	soldPrice?: number;
	soldBrokerage?: number;
}
