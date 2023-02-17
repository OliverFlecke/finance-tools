import {
	ApiResponse,
	apiUrlWithPath,
	useApi,
	useApiCall,
	useApiWithUrlCall,
} from 'features/apiBase';
import { useCallback } from 'react';
import { StockList } from '../models';

export function useFetchStocks(): ApiResponse<StockList> {
	return useApi<StockList>(
		`${apiUrlWithPath}/stock/tracked`,
		{
			method: 'GET',
		},
		fixDates
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function fixDates(stocks: any): StockList {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return stocks.map((stock: any) => ({
			...stock,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			lots: stock.lots.map((lot: any) => ({
				...lot,
				buyDate: new Date(Date.parse(lot.buyDate)),
				soldDate: lot.soldDate ? new Date(Date.parse(lot.soldDate)) : undefined,
			})),
		}));
	}
}

export function useTrackStockCallback(): (
	symbol: string
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/stock/tracked`, {
		method: 'POST',
	});
}

export function useAddStockLotCallback(): (
	lot: AddStockLotRequest
) => Promise<string> {
	const handler = useApiCall(`${apiUrlWithPath}/stock/lot`, {
		method: 'POST',
	});

	return useCallback(
		async (lot: AddStockLotRequest) => {
			const res = await handler(lot);
			return await res?.json();
		},
		[handler]
	);
}

export function useUpdateStockLotCallback(): (
	id: string,
	lot: UpdateStockLotRequest
) => Promise<Response | undefined> {
	const handler = useApiWithUrlCall();

	return useCallback(
		(id: string, lot: UpdateStockLotRequest) =>
			handler(`${apiUrlWithPath}/stock/lot/${id}`, { method: 'PUT' }, lot),
		[handler]
	);
}

export function useDeleteStockLotCallback(): (
	id: string
) => Promise<Response | undefined> {
	const handler = useApiWithUrlCall();

	return useCallback(
		(id: string) =>
			handler(`${apiUrlWithPath}/stock/lot/${id}`, { method: 'DELETE' }),
		[handler]
	);
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
