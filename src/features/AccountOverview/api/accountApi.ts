import { apiUrlWithPath, post, put, useSampleData } from 'features/apiBase';
import { CurrencySymbol } from 'features/Currency/api';
import { Account, AccountType } from '../models/Account';
import sampleData from './sampleData';

export async function getAccountsWithEntries(): Promise<AccountResponse[]> {
	if (useSampleData) return Promise.resolve(sampleData);

	try {
		const response = await fetch(`${apiUrlWithPath}/account`, {
			method: 'get',
			credentials: 'include',
		});

		const content = await response.json();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return content.map((x: any) => ({
			...x,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			entries: x.entries.map((entry: any) => ({
				...entry,
				date: new Date(Date.parse(entry.date)),
			})),
		}));
	} catch (error) {
		console.warn("Failed to get user's accounts");
		return [];
	}
}

export async function addAccount(account: Account): Promise<string> {
	return await post(`${apiUrlWithPath}/account`, account).then(res =>
		res.json()
	);
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
