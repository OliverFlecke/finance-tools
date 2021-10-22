import { apiVersion, baseUri, post } from '../../apiBase';
import { Account, AccountType } from '../models/Account';

export async function getAccountsWithEntries(): Promise<AccountResponse[]> {
	const response = await fetch(`${baseUri}/${apiVersion}/account`, {
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
}

export async function addAccount(account: Account): Promise<string> {
	return await post(`${baseUri}/${apiVersion}/account`, account).then((res) => res.json());
}

export async function updateEntry(entry: AddAccountEntryRequest): Promise<void> {
	await post(`${baseUri}/${apiVersion}/account/entry`, entry);
}

interface AccountResponse {
	id: string;
	name: string;
	type: AccountType;
	entries: EntryResponse[];
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
