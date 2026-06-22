import { type ApiResponse, apiUrlWithPath, useApi, useApiCall } from "features/apiBase";
import type { CurrencySymbol } from "features/Currency/api";
import { Account, type AccountType } from "../models/Account";

export function useAccounts(): ApiResponse<AccountResponse[]> {
	return useApi<AccountResponse[]>(`${apiUrlWithPath}/account`, {
		method: "GET",
	});
}

export function useUpdateAccountsCallback(): (
	accounts: UpdateAccount[],
) => Promise<Response | undefined> {
	return useApiCall(`${apiUrlWithPath}/account`, {
		method: "PUT",
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

interface UpdateAccount {
	id: string;
	name?: string;
	type?: AccountType;
	currency?: string;
	sortKey?: number;
}
