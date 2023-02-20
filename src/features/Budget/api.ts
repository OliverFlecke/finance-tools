import { useCallback } from 'react';
import { isDevelopment } from '../../utils/general';
import { ApiResponse, useApi, useApiWithUrlCall } from '../apiBase';

const budgetHost = isDevelopment
	? 'http://localhost:4000'
	: 'https://finance.oliverflecke.me';

export function useBudgets(): ApiResponse<Budget[]> {
	return useApi<Budget[]>(`${budgetHost}/budget`, { method: 'GET' });
}

export function useDeleteBudgetCallback() {
	const handler = useApiWithUrlCall();

	return useCallback(
		(id: string) => handler(`${budgetHost}/budget/${id}`, { method: 'DELETE' }),
		[handler]
	);
}

export interface Budget {
	id: string;
	title: string;
	created_at: Date;
	user_id: string;
}
