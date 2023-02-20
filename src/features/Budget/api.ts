import { useCallback } from 'react';
import { isDevelopment } from '../../utils/general';
import {
	ApiResponse,
	parseWithDate,
	useApi,
	useApiWithUrlCall,
} from '../apiBase';

const budgetHost = isDevelopment
	? 'http://localhost:4000'
	: 'https://finance.oliverflecke.me';

export function useFetchAllBudgets(): ApiResponse<Budget[]> {
	return useApi<Budget[]>(`${budgetHost}/budget`, { method: 'GET' });
}

export function useDeleteBudgetCallback() {
	const handler = useApiWithUrlCall();

	return useCallback(
		(id: string) => handler(`${budgetHost}/budget/${id}`, { method: 'DELETE' }),
		[handler]
	);
}

export function useFetchBudgetWithItemsCallback(): (
	id: string
) => Promise<BudgetWithItems | null> {
	const handler = useApiWithUrlCall();

	return useCallback(
		async (id: string) => {
			const res = await handler(`${budgetHost}/budget/${id}`, {
				method: 'GET',
			});
			const text = await res?.text();
			if (!text) {
				return null;
			}

			return parseWithDate(text) as BudgetWithItems;
		},
		[handler]
	);
}

export interface Budget {
	id: string;
	title: string;
	created_at: Date;
	user_id: string;
}

export interface BudgetWithItems extends Budget {
	items: Item[];
}

export interface Item {
	id: string;
	budget_id: string;
	category: string;
	name: string;
	amount: number;
	created_at: Date;
	modified_at: Date;
}
