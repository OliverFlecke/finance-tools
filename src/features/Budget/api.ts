import { useCallback } from 'react';
import { isDevelopment } from '../../utils/general';
import {
	ApiResponse,
	parseWithDate,
	useApi,
	useApiCall,
	useApiWithUrlCall,
} from '../apiBase';

const budgetHost = isDevelopment
	? 'http://localhost:4000'
	: 'https://finance.oliverflecke.me';

export function useFetchAllBudgets(): ApiResponse<Budget[]> {
	return useApi<Budget[]>(`${budgetHost}/budget`, { method: 'GET' });
}

export interface CreateBudgetDto {
	title: string;
}

// TODO: The type should not expose the `Response`
export function useCreateBudgetCallback(): (
	request: CreateBudgetDto
) => Promise<Response | undefined> {
	return useApiCall<CreateBudgetDto>(`${budgetHost}/budget`, {
		method: 'POST',
	});
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

// Item API

interface AddItemToBudgetRequest {
	category: string;
	name: string;
	amount: number;
}

/**
 * Create a callback function to add an item to a budget and persist in server side.
 *
 * @param budget_id Id of the budget to delete the item from.
 * @param request Body of the request that is send to the API with the item info.
 * @returns A promise that resolves to void or throws an error.
 */
export function useAddItemToBudgetCallback(): (
	budget_id: string,
	request: AddItemToBudgetRequest
) => Promise<void> {
	const handler = useApiWithUrlCall();

	return useCallback(
		async (budget_id: string, request: AddItemToBudgetRequest) => {
			const res = await handler(
				`${budgetHost}/budget/${budget_id}/item`,
				{
					method: 'POST',
				},
				request
			);

			if (!res?.ok) {
				throw Error(await res?.text());
			}
		},
		[handler]
	);
}

/**
 * Create a callback function to update a item on a budget.
 *
 * @param budget_id Id of the budget to delete the item from.
 * @param item_id Id of the item to remove from the budget.
 * @param request Body of the request that is send to the API with the updated item info.
 * @returns A promise that resolves to void or throws an error.
 */
export function useUpdateItemCallback(): (
	budget_id: string,
	item_id: string,
	request: AddItemToBudgetRequest
) => Promise<void> {
	const handler = useApiWithUrlCall();

	return useCallback(
		async (
			budget_id: string,
			item_id: string,
			request: AddItemToBudgetRequest
		) => {
			const res = await handler(
				`${budgetHost}/budget/${budget_id}/item/${item_id}`,
				{
					method: 'PUT',
				},
				request
			);

			if (!res?.ok) {
				throw Error(await res?.text());
			}
		},
		[handler]
	);
}

/**
 * Create a callback function to delete a item from a budget.
 *
 * @param budget_id Id of the budget to delete the item from.
 * @param item_id Id of the item to remove from the budget.
 *
 * @returns A promise that will resolve to void or throw an error.
 */
export function useDeleteItemCallback(): (
	budget_id: string,
	item_id: string
) => Promise<void> {
	const handler = useApiWithUrlCall();

	return useCallback(
		async (budget_id: string, item_id: string) => {
			const res = await handler(
				`${budgetHost}/budget/${budget_id}/item/${item_id}`
			);

			if (!res?.ok) {
				throw Error(await res?.text());
			}
		},
		[handler]
	);
}
