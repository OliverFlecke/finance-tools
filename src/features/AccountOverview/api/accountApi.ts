import {
	ApiResponse,
	apiUrlWithPath,
	useApi,
	useApiCall,
} from 'features/apiBase';
import { CurrencySymbol } from 'features/Currency/api';
import { Account, AccountType } from '../models/Account';

export function useAccounts(): ApiResponse<AccountResponse[]> {
	return useApi<AccountResponse[]>(`${apiUrlWithPath}/account`, {
		method: 'GET',
	});
}

export function useAddAccountCallback(): (
	account: Account
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/account`, {
		method: 'POST',
	});
}

export function useUpdateEntryCallback(): (
	entry: AddAccountEntryRequest
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/account/entry`, {
		method: 'POST',
	});
}

export function useUpdateAccountsCallback(): (
	accounts: UpdateAccount[]
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/account`, {
		method: 'PUT',
	});
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
