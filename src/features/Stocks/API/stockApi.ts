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
	return useApi<StockList>(`${apiUrlWithPath}/stock/tracked`, {
		method: 'GET',
	});
}

export function useTrackStockCallback(): (
	symbol: string,
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/stock/tracked`, {
		method: 'POST',
	});
}

export function useAddStockLotCallback(): (
	lot: AddStockLotRequest,
) => Promise<string> {
	const handler = useApiCall(`${apiUrlWithPath}/stock/lot`, {
		method: 'POST',
	});

	return useCallback(
		async (lot: AddStockLotRequest) => {
			const res = await handler(lot);
			return await res?.json();
		},
		[handler],
	);
}

export function useUpdateStockLotCallback(): (
	id: string,
	lot: UpdateStockLotRequest,
) => Promise<Response | undefined> {
	const handler = useApiWithUrlCall();

	return useCallback(
		(id: string, lot: UpdateStockLotRequest) =>
			handler(`${apiUrlWithPath}/stock/lot/${id}`, { method: 'PUT' }, lot),
		[handler],
	);
}

export function useDeleteStockLotCallback(): (
	id: string,
) => Promise<Response | undefined> {
	const handler = useApiWithUrlCall();

	return useCallback(
		(id: string) =>
			handler(`${apiUrlWithPath}/stock/lot/${id}`, { method: 'DELETE' }),
		[handler],
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
