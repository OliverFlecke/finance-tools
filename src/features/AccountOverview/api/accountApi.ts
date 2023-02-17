import {
	ApiResponse,
	apiUrlWithPath,
	post,
	put,
	useApi,
	useApiCall,
} from 'features/apiBase';
import { CurrencySymbol } from 'features/Currency/api';
import { Account, AccountType } from '../models/Account';

export function useAccounts(): ApiResponse<AccountResponse[]> {
	return useApi<AccountResponse[]>(
		`${apiUrlWithPath}/account`,
		{
			method: 'GET',
			mode: 'cors',
		},
		fixDates
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fixDates(response: any): AccountResponse[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return response.map((x: any) => ({
		...x,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		entries: x.entries.map((entry: any) => ({
			...entry,
			date: new Date(Date.parse(entry.date)),
		})),
	}));
}

export function useAddAccountCallback(): (
	account: Account
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/account`, {
		method: 'POST',
	});
}

export async function updateEntry(
	entry: AddAccountEntryRequest
): Promise<void> {
	await post(`${apiUrlWithPath}/account/entry`, entry);
}

export async function updateAccounts(
	accounts: UpdateAccount[]
): Promise<Response> {
	return put(`${apiUrlWithPath}/account`, accounts);
}

export interface AccountResponse {
	id: string;
	name: string;
	type: AccountType;
	entries: EntryResponse[];
	currency: CurrencySymbol;
	sortKey: number;
}

interface EntryResponse {
	date: Date;
	amount: number;
}

interface AddAccountEntryRequest {
	accountId: string;
	date: string; // Must be a DateOnly formatted string
	amount: number;
}

interface UpdateAccount {
	id: string;
	name?: string;
	type?: AccountType;
	currency?: string;
	sortKey?: number;
}
